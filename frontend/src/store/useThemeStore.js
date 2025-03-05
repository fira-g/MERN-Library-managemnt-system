import {create} from "zustand"

export const useThemeStore = create((set)=>({
    theme:  localStorage.getItem("chat-theme") || "lofi",
    setTheme: (theme)=>{
        localStorage.setItem("chat-theme" ,theme)
        set({theme})
    },
    isDark: localStorage.getItem("chat-theme") === "dark" 
}
))