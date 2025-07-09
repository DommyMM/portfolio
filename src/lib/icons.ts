import * as SimpleIcons from 'simple-icons';
import React from 'react';

// Type for the icon data
export interface IconData {
    title: string;
    hex: string;
    path: string;
}

// Type for local SVG files
export interface LocalIconData {
    type: 'local';
    path: string;
}

// Type for SimpleIcons data
export interface SimpleIconData {
    type: 'simple';
    data: IconData;
}

// Union type for all icon data
export type IconDataUnion = LocalIconData | SimpleIconData;

// Map of icon slugs to their icon data
export const iconMap: Record<string, IconDataUnion> = {
    // Frontend Development
    react: { type: 'simple', data: SimpleIcons.siReact },
    nextdotjs: { type: 'simple', data: SimpleIcons.siNextdotjs },
    typescript: { type: 'simple', data: SimpleIcons.siTypescript },
    tailwindcss: { type: 'simple', data: SimpleIcons.siTailwindcss },
    svelte: { type: 'simple', data: SimpleIcons.siSvelte },
    javascript: { type: 'simple', data: SimpleIcons.siJavascript },
    html5: { type: 'simple', data: SimpleIcons.siHtml5 },
    css3: { type: 'simple', data: SimpleIcons.siCss },
    vite: { type: 'simple', data: SimpleIcons.siVite },
    webpack: { type: 'simple', data: SimpleIcons.siWebpack },
    eslint: { type: 'simple', data: SimpleIcons.siEslint },
    prettier: { type: 'simple', data: SimpleIcons.siPrettier },
    figma: { type: 'simple', data: SimpleIcons.siFigma },
    vercel: { type: 'simple', data: SimpleIcons.siVercel },

    // Backend Systems
    fastapi: { type: 'simple', data: SimpleIcons.siFastapi },
    nodedotjs: { type: 'simple', data: SimpleIcons.siNodedotjs },
    express: { type: 'simple', data: SimpleIcons.siExpress },
    go: { type: 'simple', data: SimpleIcons.siGo },
    python: { type: 'simple', data: SimpleIcons.siPython },
    postman: { type: 'simple', data: SimpleIcons.siPostman },
    swagger: { type: 'simple', data: SimpleIcons.siSwagger },
    jsonwebtokens: { type: 'simple', data: SimpleIcons.siJsonwebtokens },
    redis: { type: 'simple', data: SimpleIcons.siRedis },
    nginx: { type: 'simple', data: SimpleIcons.siNginx },
    apache: { type: 'simple', data: SimpleIcons.siApache },
    graphql: { type: 'simple', data: SimpleIcons.siGraphql },

    // AI/ML Engineering
    pytorch: { type: 'simple', data: SimpleIcons.siPytorch },
    opencv: { type: 'simple', data: SimpleIcons.siOpencv },
    openai: { type: 'simple', data: SimpleIcons.siOpenai },
    tensorflow: { type: 'simple', data: SimpleIcons.siTensorflow },
    scikitlearn: { type: 'simple', data: SimpleIcons.siScikitlearn },
    jupyter: { type: 'simple', data: SimpleIcons.siJupyter },
    anaconda: { type: 'simple', data: SimpleIcons.siAnaconda },
    numpy: { type: 'simple', data: SimpleIcons.siNumpy },
    pandas: { type: 'simple', data: SimpleIcons.siPandas },
    matplotlib: { type: 'local', path: '/matlab.svg' },
    anthropic: { type: 'simple', data: SimpleIcons.siAnthropic },

    // Infrastructure
    postgresql: { type: 'simple', data: SimpleIcons.siPostgresql },
    mongodb: { type: 'simple', data: SimpleIcons.siMongodb },
    docker: { type: 'simple', data: SimpleIcons.siDocker },
    git: { type: 'simple', data: SimpleIcons.siGit },
    github: { type: 'simple', data: SimpleIcons.siGithub },
    githubactions: { type: 'simple', data: SimpleIcons.siGithubactions },
    amazonaws: { type: 'local', path: '/amazon.svg' },
    googlecloud: { type: 'simple', data: SimpleIcons.siGooglecloud },
    linux: { type: 'simple', data: SimpleIcons.siLinux },
    ubuntu: { type: 'simple', data: SimpleIcons.siUbuntu },
    railway: { type: 'simple', data: SimpleIcons.siRailway },
    };

// Function to get icon data by slug
export function getIconData(slug: string): IconDataUnion | null {
    return iconMap[slug] || null;
}

// Function to get SVG path for an icon
export function getIconSvgPath(slug: string): string | null {
    const iconData = getIconData(slug);
    if (!iconData) return null;
    
    if (iconData.type === 'local') {
        return iconData.path;
    } else {
        return iconData.data.path;
    }
}

// Function to get icon color for an icon
export function getIconColor(slug: string): string | null {
    const iconData = getIconData(slug);
    if (!iconData || iconData.type === 'local') return null;
    
    return `#${iconData.data.hex}`;
}

// Function to check if icon is local
export function isLocalIcon(slug: string): boolean {
    const iconData = getIconData(slug);
    return iconData?.type === 'local';
}

// Function to create React SVG component from SimpleIcons data
export function createIconComponent(slug: string, props: React.SVGProps<SVGSVGElement> = {}): React.ReactElement | null {
    const iconData = getIconData(slug);
    if (!iconData) return null;

    if (iconData.type === 'local') {
        // For local SVG files, return an img element
        return React.createElement('img', {
            src: iconData.path,
            alt: slug,
            width: 40,
            height: 40,
            ...props
        });
    } else {
        // For SimpleIcons, create an SVG element with the actual brand color
        const iconColor = `#${iconData.data.hex}`;
        return React.createElement('svg', {
            viewBox: '0 0 40 40',
            fill: iconColor,
            width: 40,
            height: 40,
            ...props
        }, React.createElement('path', {
            d: iconData.data.path
        }));
    }
}

// Function to get all icon components for a list of slugs
export function getIconComponents(slugs: string[], props: React.SVGProps<SVGSVGElement> = {}): React.ReactElement[] {
    return slugs
        .map(slug => createIconComponent(slug, props))
        .filter((icon): icon is React.ReactElement => icon !== null);
}