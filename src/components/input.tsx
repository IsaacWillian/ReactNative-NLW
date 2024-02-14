import { TextInputProps,TextInput } from "react-native";
import colors from "tailwindcss/colors";

export function Input({...rest}:TextInputProps){
    return <TextInput
        multiline
        textAlignVertical="top"
        placeholderTextColor={colors.slate[400]}
        className="h-32 bg-slate-800 text-white px-4 py-2 rounded-md font-body"
        {...rest}

    />
}