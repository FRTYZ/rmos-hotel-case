// Next router
import Link from 'next/link';

// inteface ve type
import { XButtonProps } from './FormElements';

export default function XButton({
    href,
    icon: Icon,
    label,
    disabled,
    backgroundColor = '',
    textStyle = '',
    padding = '',
    margin = '',
    radius = '',
    addStyle = '',
    onClick,
    ...rest
}: XButtonProps) {
    const hoverStyle = backgroundColor == 'white' ? 'opacity-80' : 'bg-gray-800'

    return (
        <>
            {href ? (
                <Link 
                    href={href}
                    onClick={onClick}
                    className={`
                        w-full ${margin} ${padding} ${backgroundColor} ${textStyle}
                        hover:${hoverStyle} ${radius}
                        ${disabled && 'opacity-50 cursor-not-allowed'}
                        ${addStyle}
                    `}
                    {...rest}
                >{label}</Link>
            ): (
                <button
                    disabled={disabled}
                    onClick={onClick}
                    className={`
                        w-full ${margin} ${padding} ${backgroundColor} ${textStyle}
                        hover:bg-gray-600 ${radius}
                        ${disabled && 'opacity-50 cursor-not-allowed'}
                        ${addStyle}
                    `}
                    {...rest}
                >{label}</button>
            )}
        </>
       
    )
}
