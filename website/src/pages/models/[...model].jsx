import Head from 'next/head'
import {Header} from '@/components/Header'
import {Hero} from '@/components/Hero'

import fs from 'fs';
import path from 'path';


export async function getStaticPaths() {
    const getLeafDirectories = (dir) => {
        const leafDirectories = [];
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                const subDirectories = getLeafDirectories(filePath);
                if (subDirectories.length === 0) {
                    leafDirectories.push(filePath);
                } else {
                    leafDirectories.push(...subDirectories);
                }
            }
        }
        return leafDirectories.map(dir => dir.replace(process.cwd() + '/public/models/', ''));
    }

    const modelDirectories = getLeafDirectories(path.join(process.cwd(), 'public/models'))
        .map(dir => {
            return { params: { model: dir.split('/') }}
        });
    return {
        paths: modelDirectories,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const basePath = path.join('/models/', context.params.model.join('/'));
    console.log(basePath);
    const imageFiles = fs.readdirSync(path.join(process.cwd(), 'public' + basePath)).filter(file => file.endsWith('.png')).map(file => path.join(basePath, file))
    return {
        props: {
            imageFiles,
        },
    };
}

export default function Home({imageFiles}) {
    return (
        <>
            <Head>
                <title>Anchorscad</title>
                <meta
                    name="description"
                    content="By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses."
                />
            </Head>
            <Header />
            <main>
                <Hero imageFiles={imageFiles}/>
            </main>
        </>
    )
}
