import {Loader} from "@mantine/core";

export default function EvaluatingCVLoader() {
    return (
        <div className={`flex flex-col items-center justify-center space-y-5`}>
            <Loader color={"blue"} size={"xl"}/>
            <div className={`text-black opacity-50`}>Please wait while we analyze your CV and build your profile</div>
        </div>
    )
}