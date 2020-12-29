// https://github.com/tailwindlabs/headlessui/blob/develop/packages/%40headlessui-react/src/utils/class-names.ts

export function classNames(...classes: (false | null | undefined | string)[]): string {
    return classes.filter(Boolean).join(' ');
}
