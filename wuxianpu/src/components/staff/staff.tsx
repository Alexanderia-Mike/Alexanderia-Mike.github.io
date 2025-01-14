import React from "react"
import Toggle from "../../common/toggle/toggle"

export default function Staff({currentNote, updateCurrentNote}: {
    currentNote: number,
    updateCurrentNote: React.Dispatch<React.SetStateAction<number>>
}) {
    return <div className="my-[20px] mx-auto p-[20px] max-w-[800px] bg-white border-solid border border-border-color rounded shadow-sm relative">
        <h1 className="text-[#333] text-3xl">五线谱练习工具</h1>
        <div className="flex">
            <div className="flex flex-grow justify-center items-center">
                <span>correct / total: </span> <span className="w-20"></span>
                <span id="correct"></span> <span id="division">/</span> <span id="total"></span>
                <button className="ml-5">重置</button>
            </div>
            <Toggle onChange={() => console.log("clef-toggle clicked")} onText="high" offText="low"/>
            <Toggle onChange={() => console.log("randomSwitch clicked")} commonText="gaodi"/>
        </div>
        <img className="absolute w-[100px] top-[205px] left-[110px]" src="gaoyin.png"/>
        <img  className="absolute w-[70px] top-[245px] left-[110px]" src="diyin.svg"/>
        <canvas className="border border-border-color bg-white w-full h-[470px]"></canvas>
        <div className="mt-[20px]">
            <button id="generateButton">生成练习题</button>
            <input type="text" id="noteInput" placeholder="输入音名 (如 C, D, E)"/>
            <button id="submitButton">提交答案</button>
        </div>
        <p className="mt-[20px] text-lg text-slate-600"></p>
    </div>
}