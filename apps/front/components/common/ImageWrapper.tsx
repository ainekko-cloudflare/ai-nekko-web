import Image from 'next/image';

export default function ImageWrapper({src, alt}: {src: string, alt:string}) {
    return (
        <Image priority={true} width="0" height="0" sizes="100vw" style={{width: '100%', height: 'auto'}} src={src} alt={alt} />
    )
}