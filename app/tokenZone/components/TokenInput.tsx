import { Select, SelectItem, Input } from "@nextui-org/react";
import Avax from "components/Icons/Avax"
import USDC from "components/Icons/USDC"
import SST from "components/Icons/Logo"

type TokenInputProps = {
    title: string
    type: 'in' | 'out'
    amountVal: string
    tokenVal: string
    setToken: (v: string) => void
    setAmount: (v: string) => void
}

const inOptions = [
    {
        label: "Avax",
        value: "Avax",
        logo: <Avax className="w-8 h-8" />
    },
    {
        label: "USDC",
        value: "USDC",
        logo: <USDC className="w-8 h-8" />
    }
]

const outOptions = [
    {
        label: "SST",
        value: "SST",
        logo: <SST className="w-8 h-8" />
    }
]

export default function TokenInput({
    title,
    type,
    tokenVal,
    setToken,
    amountVal,
    setAmount
}: TokenInputProps) {
    const options = type == 'in' ? inOptions : outOptions

    const logo = useMemo(() => {
        return options.find(item => item.value == tokenVal)?.logo
    }, [tokenVal, options])

    return <div className="w-full shadow-md p-2 rounded-2xl bg-[#FFFFFF80]">
        <div className="flex items-center">
            <Select
                label={title}
                className="max-w-[28%]"
                classNames={{
                    trigger: "rounded-full shadow-md min-h-12 h-12 bg-[#FFFFFFBD]",
                    popoverContent: "w-200"
                }}
                startContent={logo}
                selectedKeys={[tokenVal]}
                onChange={({ target }) => target.value && setToken(target.value)}
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
                onChange={({ target }) => setAmount(target.value)}
                variant="faded"
                type="number"
                label="amount"
                min={0}
            />
        </div>
        <div className="flex justify-between items-center mt-1 px-2">
            <div className="text-xs">balance: </div>
            {type == 'in' && <div className="btn h-4 min-h-4 text-xs">max</div>}

        </div>
    </div>
}
