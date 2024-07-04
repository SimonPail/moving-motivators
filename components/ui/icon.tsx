import { icons } from "lucide-react";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
 name: string;
}

interface Icons {
 [key: string]: React.ComponentType;
}

const Icon = ({ name, ...props }: IconProps) => {
 const LucideIcon = (icons as Icons)[name];

 return <LucideIcon {...props} />;
};

export default Icon;
