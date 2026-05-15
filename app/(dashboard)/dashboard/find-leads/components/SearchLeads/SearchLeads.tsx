'use client'

import { Button } from "@/components/ui/button"
import { SearchIcon } from "@/components/ui/search"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const SearchLeads = () => {
    return (
        <div>
            <form>
                <FieldSet>
                    <FieldLegend>Profile</FieldLegend>
                    <FieldDescription>This appears on invoices and emails.</FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Full name</FieldLabel>
                            <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
                            <FieldDescription>This appears on invoices and emails.</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input id="username" autoComplete="off" aria-invalid />
                            <FieldError>Choose another username.</FieldError>
                        </Field>
                        <Field>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                </FieldSet>

                <Button >
                    Guardar
                    <SearchIcon />
                </Button>
            </form>
        </div>
    )
}