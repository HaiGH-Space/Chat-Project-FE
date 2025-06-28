import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function AvatarHeader({src,alt}:{ src: string, alt?: string }) {
    return (
        <Avatar>
            <AvatarImage src={src} />
            <AvatarFallback>{alt}</AvatarFallback>
        </Avatar>
    )
}