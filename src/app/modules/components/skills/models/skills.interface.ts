import { SkillsCategory } from "@appcore/type/utils.type";
import { SkillsColorClasses } from "./skills.const";

export interface Skills {
    id: SkillsCategory;
    iconClass: string;
    colorKey: keyof typeof SkillsColorClasses;
    skills: string[];
}
