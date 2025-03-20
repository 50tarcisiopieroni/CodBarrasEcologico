"use client";

import { useEffect, useState } from "react"
import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import { AccountCircle as ProfileIcon, Home as HomeIcon } from "@mui/icons-material"
import { usePathname, useRouter } from "next/navigation"
import RecyclingIcon from '@mui/icons-material/Recycling'

export default function BottomNav() {

    const router = useRouter()

    const pathname = usePathname()

    const getInitialValue = () => {
        if (pathname === "/") return 0
        if (pathname === "/recycling") return 1
        if (pathname === "/profile") return 2
        return 0
    }
    const [value, setValue] = useState(getInitialValue())

    useEffect(() => {
        setValue(getInitialValue())
    }, [pathname])

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                setTimeout(() => {
                if (newValue === 0) router.push("/")
                if (newValue === 1) router.push("/recycling")
                if (newValue === 2) router.push("/profile")
                }, 100)
            }}
            sx={{ width: "100%", position: "fixed", bottom: 0, backgroundColor: "#B9D9B1" }}
        >
            <BottomNavigationAction label="Home" icon={<HomeIcon />  } 
                sx={{ color: value == 0 ? "green"  : "inherit", "&.Mui-selected": {
                color: "#768C64",
                },}}
                />
            <BottomNavigationAction label="Reciclados" icon={<RecyclingIcon /> } 
            sx={{ color: value == 1 ? "green"  : "inherit", "&.Mui-selected": {
                color: "#768C64",
                },}}
                />
            <BottomNavigationAction label="Perfil" icon={<ProfileIcon />} 
            sx={{ color: value == 2 ? "green"  : "inherit", "&.Mui-selected": {
                    color: "#768C64",
                },}}
                />
        </BottomNavigation>
    )
}
