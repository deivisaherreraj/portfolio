import { AboutServices } from "@appmodules/components/about/models/about.interface";

// Array de habilidades para renderizado dinámico
export const aboutSkills: string[] = [
    '.NET (C#)',
    'Angular',
    'Node.js',
    'TypeScript',
    'JavaScript',
    'PHP',
];

// Array de datos para las tarjetas de servicios
export const aboutServices: AboutServices[] = [
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code" aria-hidden="true" data-id="element-65"><path d="m16 18 6-6-6-6"></path><path d="m8 6-6 6 6 6"></path></svg>',
        title: 'Desarrollo Full-Stack',
        description: 'Construyendo soluciones integrales con tecnologías modernas y las mejores prácticas.',
    },
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users" aria-hidden="true" data-id="element-72"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>',
        title: 'Liderazgo Técnico',
        description: 'Orientar a los equipos de desarrollo para entregar software de alta calidad a tiempo.',
    },
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-500 mb-4 lucide lucide-brain"><path d="M15.5 17a5 5 0 0 0-7 0"></path><path d="M12 18a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"></path><path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 1 4 4v0a4 4 0 0 1 4-4V6a4 4 0 0 0-4-4Z"></path><path d="M15 20a5 5 0 0 0 0-10a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4a5 5 0 0 0 0 10"></path></svg>',
        title: 'Arquitectura de Software',
        description: 'Diseño de sistemas escalables y mantenibles.',
    },
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-500 mb-4 lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>',
        title: 'Optimización',
        description: 'Mejora de rendimiento y experiencia de usuario.',
    },
];
