/** Colores seguros para Tailwind (clases explícitas) */
export const SkillsColorClasses = {
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
    green: { bg: 'bg-green-500/20', text: 'text-green-400' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
    pink: { bg: 'bg-pink-500/20', text: 'text-pink-400' },
    cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
} as const;

export const SkillsData = {
    frontend: [
        'React',
        'TypeScript',
        'JavaScript',
        'Next.js',
        'HTML5',
        'CSS3',
        'Tailwind CSS',
        'Redux',
        'Material UI',
    ],
    backend: [
        'Node.js',
        'Express',
        'GraphQL',
        'REST APIs',
        'Python',
        'Java',
        'PHP',
        'Microservices',
    ],
    databases: [
        'MongoDB',
        'PostgreSQL',
        'MySQL',
        'Redis',
        'Firebase',
        'DynamoDB',
    ],
    devops: ['Docker', 'AWS', 'CI/CD', 'Jenkins', 'Kubernetes', 'Git', 'Linux'],
    methodologies: ['Agile', 'Scrum', 'TDD', 'Code Review', 'Pair Programming'],
    others: ['Figma', 'Jira', 'Slack', 'VS Code', 'Postman', 'Analytics'],
};
