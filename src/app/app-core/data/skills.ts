import { SkillsData } from '@appmodules/components/skills/models/skills.const';
import { Skills } from '@appmodules/components/skills/models/skills.interface';

export const skills: Skills[] = [
    {
        id: 'Frontend',
        iconClass: 'bi bi-code-slash',
        colorKey: 'blue',
        skills: SkillsData.frontend,
    },
    {
        id: 'Backend',
        iconClass: 'bi bi-hdd-network',
        colorKey: 'purple',
        skills: SkillsData.backend,
    },
    {
        id: 'Databases',
        iconClass: 'bi bi-database',
        colorKey: 'green',
        skills: SkillsData.databases,
    },
    {
        id: 'Devops',
        iconClass: 'bi bi-cloud',
        colorKey: 'orange',
        skills: SkillsData.devops,
    },
    {
        id: 'Methodologies',
        iconClass: 'bi bi-git',
        colorKey: 'pink',
        skills: SkillsData.methodologies,
    },
    {
        id: 'Others',
        iconClass: 'bi bi-wrench',
        colorKey: 'cyan',
        skills: SkillsData.others,
    },
];
