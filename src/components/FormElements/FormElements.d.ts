import { ReactElement } from "react";

// XButton
export interface XButtonProps {
    href?: string;
    label?: ReactElement | string;
    disabled?: boolean;
    backgroundColor?:string;
    textStyle?:string;
    padding?:string;
    margin?:string;
    radius?:string;
    addStyle?:string;
    onClick?: () => void;
    [key: string]: any;
}

// XInput
export interface XInputProp {
    type: string;
    name?: string;
    label?: string;
    labelType?: | 'normal' | 'top';
    value?: string | number;
    placeholder?: string;
    errorMessage?: string;
    helperText?: string;
    disabled?: boolean;
    sideContent?: ReactElement | null;
    sideContentPosition?: string;
    addStyle?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any;
}

// XSelectBox
type SelectBoxValueProps = {
    value: string | number;
    label: string | number;
}

export interface XSelectBoxProp {
    name?: string;
    label?: string;
    labelType?: | 'normal' | 'top';
    values?: SelectBoxValueProps[];
    value?:string | number;
    errorMessage?: string;
    disabled?: boolean;
    labelClassName?:string;
    inputClassName?:string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    [key: string]: any;
}
