"use client";

import { useEffect, useRef } from "react";
import { useSpring, useReducedMotion } from "motion/react";

const glyphs = [
    "က", "ခ", "ဂ", "ဃ", "င",
    "စ", "ဆ", "ဇ", "ဈ", "ည",
    "ဋ", "ဌ", "ဍ", "ဎ", "ဏ",
    "တ", "ထ", "ဒ", "ဓ", "န",
    "ပ", "ဖ", "ဗ", "ဘ", "မ",
    "ယ", "ရ", "လ", "ဝ", "သ",
    "ဟ", "ဠ", "အ",
    "ဣ", "ဤ", "ဥ", "ဦ", "ဧ",
    "ဩ", "ဪ", "၌", "၍", "၎", "၏",
    
    "人", "大", "小", "上", "下",
    "中", "口", "日", "月", "火",
    "水", "木", "土", "金", "山",
    "川", "手", "目", "耳", "足",
    "心", "力", "刀", "車", "馬",
    "魚", "鳥", "虫", "草", "花",
    "風", "雨", "雪", "天", "地",
    "東", "西", "南", "北", "左",
    "右", "前", "後", "内", "外",
    "古", "今", "新", "旧", "高",
    "低", "長", "短", "広", "狭",
    "多", "少", "早", "晩", "春",
    "夏", "秋", "冬", "年", "月",
    "日", "時", "分", "秒", "週"
];

type DecoderTextProps = {
    text: string;
    className?: string;
    delay?: number;
};

type OutputChar = { type: "glyph" | "value"; value: string };

export function TextDecoder({ text, className = "", delay = 0 }: DecoderTextProps) {
    const output = useRef<OutputChar[]>([]);
    const container = useRef<HTMLSpanElement>(null);
    const reduceMotion = useReducedMotion();
    const decoderSpring = useSpring(0, { stiffness: 8, damping: 5 });

    useEffect(() => {
        const content = text.split("");

        const shuffle = (content: string[], output: OutputChar[], position: number): OutputChar[] => {
        return content.map((value, index) => {
            if (index < position) {
            return { type: "value", value };
            }
            if (position % 1 < 0.5) {
            const rand = Math.floor(Math.random() * glyphs.length);
            return { type: "glyph", value: glyphs[rand] };
            }
            return { type: "glyph", value: output[index]?.value || "" };
        });
        };

        const renderOutput = () => {
        if (!container.current) return;
        const characterMap = output.current.map((item) => (
            `<span style="${item.type === "glyph" ? "opacity:0.5;" : "font-weight:600;"}">${item.value}</span>`
        ));
        container.current.innerHTML = characterMap.join("");
        };

        const unsubscribeSpring = decoderSpring.on("change", (value) => {
        output.current = shuffle(content, output.current, value);
        renderOutput();
        });

        const startSpring = async () => {
        if (delay) await new Promise((res) => setTimeout(res, delay));
        decoderSpring.set(content.length);
        };

        if (!reduceMotion) {
        startSpring();
        } else {
        output.current = content.map((value) => ({ type: "value" as const, value }));
        renderOutput();
        }

        return () => {
        unsubscribeSpring?.();
        };
        // eslint-disable-next-line
    }, [decoderSpring, reduceMotion, delay, text]);

    return (
        <span className={className}>
        <span aria-hidden ref={container} />
        </span>
    );
} 