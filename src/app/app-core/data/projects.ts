import { Project } from '../../modules/administraciones/portfolio/models/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with cart, payment processing, and order management.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveLink: 'https://example.com/ecommerce',
    githubLink: 'https://github.com/example/ecommerce',
    details: 'This project was built to provide a seamless shopping experience. It features user authentication, product catalog with search and filtering, shopping cart functionality, secure checkout with Stripe integration, and order history. The admin panel allows for product management, order processing, and analytics dashboards.',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task manager with real-time updates, team assignments, and progress tracking.',
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'Firebase', 'Redux', 'Material UI'],
    liveLink: 'https://example.com/taskmanager',
    githubLink: 'https://github.com/example/taskmanager',
    details: 'A comprehensive task management solution designed for team collaboration. Features include drag-and-drop task boards, real-time updates using Firebase, team member assignment, due date tracking, file attachments, comment threads, and customizable workflows. The application also includes reporting features to track team productivity and project progress.',
  },
  {
    id: '3',
    title: 'AI Image Generator',
    description: 'An application that uses machine learning to generate unique images from text descriptions.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'TensorFlow.js', 'Canvas API', 'Express'],
    liveLink: 'https://example.com/ai-image',
    githubLink: 'https://github.com/example/ai-image',
    details: 'This project leverages machine learning models to generate unique images based on text prompts. It uses TensorFlow.js for client-side inference, allowing users to create art without server-side processing. Features include customizable generation parameters, image history, the ability to refine results with feedback, and options to download or share generated images on social media.',
  },
];