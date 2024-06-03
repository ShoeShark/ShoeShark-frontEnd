import { Select, SelectItem, Input } from "@nextui-org/react";
import AvaxIcon from "components/Icons/Avax"
import USDCIcon from "components/Icons/USDC"
import SSTIcon from "components/Icons/Logo"
import { SST, USDC, WETH } from "config/constants/token";
import { Address, erc20Abi, formatEther } from "viem";
import { publicClient } from "config";
import { useAccount, useWatchContractEvent } from "wagmi"

type TokenInputProps = {
    title: string
    type: 'in' | 'out'
    amountVal: string
    tokenVal: string
    setToken: (v: string) => void
    setAmount: (v: string) => void
    tx?: string
}

const inOptions = [
    {
        label: "Avax",
        value: WETH,
        logo: <AvaxIcon className="w-8 h-8" />
    },
    {
        label: "USDC",
        value: USDC,
        logo: <USDCIcon className="w-8 h-8" />
    }
]

const outOptions = [
    {
        label: "SST",
        value: SST,
        logo: <SSTIcon className="w-8 h-8" />
    }
]

export default function TokenInput({
    title,
    type,
    tokenVal,
    setToken,
    amountVal,
    setAmount,
    tx
}: TokenInputProps) {
    const account = useAccount()
    const options = type == 'in' ? inOptions : outOptions

    const logo = useMemo(() => {
        return options.find(item => item.value == tokenVal)?.logo
    }, [tokenVal, options])

    function setTokenValue(val: string) {
        if (val !== tokenVal) {
            setToken(val);
        }
    }
    const [balance, setBalance] = useState('');
    // const result = useBalance({
    //     address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    //     blockTag: 'latest',
    // })

    async function loadBalance() {
        let _bal: bigint;

        if (tokenVal == WETH) {
            _bal = await publicClient.getBalance({
                address: account.address!,
                blockTag: 'safe'
            })
        } else {
            _bal = await publicClient.readContract({
                address: tokenVal as Address,
                abi: erc20Abi,
                functionName: "balanceOf",
                args: [account.address!]
            })
        }

        setBalance(formatEther(_bal) || '0');
    }

    useEffect(() => {
        if (account.address || tx)
            loadBalance()

    }, [tokenVal, account.address, tx])

    function setMax() {
        setAmount(balance)
    }

    return <div className="w-full shadow-md p-2 rounded-2xl bg-[#FFFFFF80]">
        <div className="flex items-center">
            <Select
                label={title}
                className="max-w-[28%]"
                classNames={{
                    trigger: "rounded-full outline-none shadow-md min-h-12 h-12 bg-[#FFFFFFBD]",
                    popoverContent: "w-200"
                }}
                startContent={logo}
                selectedKeys={[tokenVal]}
                onChange={({ target }) => setTokenValue(target.value)}
            >
                {options.map((opt) => (
                    <SelectItem
                        key={opt.value}
                        value={opt.value}
                        startContent={opt.logo}
                    >
                        {opt.label}
                    </SelectItem>
                ))}
            </Select>
            <Input
                value={amountVal}
                className="border-none"
                classNames={{
                    inputWrapper: "rounded-r-full bg-transparent border-none shadow-none",
                    helperWrapper: "h-0 p-0"
                }}
                size="lg"
                disabled={type == 'out'}
                onChange={({ target }) => setAmount(target.value)}
                variant="faded"
                type="number"
                label="amount"
                isInvalid={false}
                min={0}
            />
        </div>
        <div className="flex justify-between items-center mt-1 px-2">
            <div className="text-xs w-full truncate">balance: {balance}</div>
            {type == 'in' &&
                <div
                    className="btn h-4 min-h-4 text-xs"
                    onClick={setMax}
                >
                    max
                </div>
            }

        </div>
    </div>
}
