import {Loader} from "@mantine/core";

export default function OpportunitiesLoader() {
    return (
        <div className={`flex flex-col items-center justify-center space-y-5`}>
            <Loader color={"blue"} size={"xl"}/>
            <div className={`text-black opacity-50`}>Please wait while we find the perfect opportunities for you</div>
        </div>
    )
}