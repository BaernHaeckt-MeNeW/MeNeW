import Card from "./Card.tsx";

interface PersonCardProps {
    name: string;
}

export function PersonCard ({ name }: PersonCardProps) {
    return (
        <Card text={name} />
    );
}