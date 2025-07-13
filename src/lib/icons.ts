import * as SimpleIcons from 'simple-icons';
import React from 'react';

// Single interface for all icon data using discriminated union
export type IconData = 
    | { type: 'local'; path: string; }
    | { type: 'simple'; data: { title: string; hex: string; path: string; }; };

// Map of icon slugs to their icon data
export const iconMap: Record<string, IconData> = {
    // Programming Languages
    python: { type: 'simple', data: SimpleIcons.siPython },
    typescript: { type: 'simple', data: SimpleIcons.siTypescript },
    javascript: { type: 'simple', data: SimpleIcons.siJavascript },
    go: { type: 'simple', data: SimpleIcons.siGo },
    cplusplus: { type: 'local', path: '/cplusplus.svg' },
    java: { type: 'local', path: '/java.svg' },
    postgresql: { type: 'simple', data: SimpleIcons.siPostgresql },
    c: { type: 'local', path: '/c.svg' },

    // AI/ML Engineering
    pytorch: { type: 'simple', data: SimpleIcons.siPytorch },
    openai: { type: 'simple', data: SimpleIcons.siOpenai },
    huggingface: { type: 'simple', data: SimpleIcons.siHuggingface },
    rag: { type: 'simple', data: SimpleIcons.siElasticsearch },
    langchain: { type: 'simple', data: SimpleIcons.siLangchain },
    computervision: { type: 'simple', data: SimpleIcons.siOpencv },
    opencv: { type: 'local', path: '/opencv.svg' },
    tensorflow: { type: 'simple', data: SimpleIcons.siTensorflow },
    numpy: { type: 'simple', data: SimpleIcons.siNumpy },
    deepseek: { type: 'local', path: '/deepseek.svg' },
    cerebras: { type: 'local', path: '/cerebras.svg' },
    chromadb: { type: 'local', path: '/chromadb.svg' },
    tesseract: { type: 'local', path: '/tesseract.svg' },

    // Frontend Development
    react: { type: 'simple', data: SimpleIcons.siReact },
    nextdotjs: { type: 'simple', data: SimpleIcons.siNextdotjs },
    tailwindcss: { type: 'simple', data: SimpleIcons.siTailwindcss },
    speechapi: { type: 'simple', data: SimpleIcons.siGoogletranslate },
    svelte: { type: 'simple', data: SimpleIcons.siSvelte },
    vite: { type: 'simple', data: SimpleIcons.siVite },
    figma: { type: 'simple', data: SimpleIcons.siFigma },
    vercel: { type: 'simple', data: SimpleIcons.siVercel },

    // Backend & Infrastructure
    fastapi: { type: 'simple', data: SimpleIcons.siFastapi },
    nodedotjs: { type: 'simple', data: SimpleIcons.siNodedotjs },
    cloudflare: { type: 'simple', data: SimpleIcons.siCloudflare },
    cicd: { type: 'simple', data: SimpleIcons.siGithubactions },
    seo: { type: 'simple', data: SimpleIcons.siGoogleanalytics },
    mongodb: { type: 'simple', data: SimpleIcons.siMongodb },
    docker: { type: 'simple', data: SimpleIcons.siDocker },
    amazonaws: { type: 'local', path: '/amazon.svg' },
    git: { type: 'simple', data: SimpleIcons.siGit },
    json: { type: 'simple', data: SimpleIcons.siJson },

    // Gaming Platforms
    steam: { type: 'simple', data: SimpleIcons.siSteam },
    discord: { type: 'simple', data: SimpleIcons.siDiscord },
    genshin: { type: 'local', path: '/genshin.webp' },
    honkai: { type: 'local', path: '/hsr.webp' },
    wuwa: { type: 'local', path: '/wuwa.webp' },
};

// Create React component from icon data - the only function we actually use
export function createIconComponent(slug: string, props: React.SVGProps<SVGSVGElement> = {}): React.ReactElement | null {
    const iconData = iconMap[slug];
    if (!iconData) return null;

    if (iconData.type === 'local') {
        return React.createElement('img', {
            src: iconData.path,
            alt: slug,
            width: 24,
            height: 24,
            ...props
        });
    } else {
        return React.createElement('svg', {
            viewBox: '0 0 24 24',
            fill: `#${iconData.data.hex}`,
            width: 24,
            height: 24,
            ...props
        }, React.createElement('path', {
            d: iconData.data.path
        }));
    }
}