import { FaRegUserCircle } from "react-icons/fa";
import { IconType } from "react-icons";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  icon: IconType;
}

export const data: TeamMember[] = [
  {
    id: 1,
    name: "Yenie Risnawarti",
    role: "Chief Executive Officer",
    icon: FaRegUserCircle,
  },
  {
    id: 2,
    name: "Agung Pujianto",
    role: "Chief Operating Officer",
    icon: FaRegUserCircle,
  },
  {
    id: 3,
    name: "Adang Y. Wibisono",
    role: "Chief Marketing Officer",
    icon: FaRegUserCircle,
  },
  {
    id: 4,
    name: "Albert Arsanto",
    role: "Commissioner",
    icon: FaRegUserCircle,
  },
];
