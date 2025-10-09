# Maintenance Next

A comprehensive maintenance management system built with Next.js 15 and TypeScript. This application helps manage vehicle maintenance services, mechanics, brands, models, and service catalogs.

## 🚀 Features

- **User Management**: Complete user authentication and authorization system
- **Vehicle Management**: Track and manage vehicles with their brands and models
- **Mechanic Management**: Manage mechanic profiles with certifications and experience
- **Service Management**: Handle service requests and track service history
- **Service Catalog**: Predefined service types and catalogs
- **Document Types**: Manage various document types for mechanics and users
- **Parts & Tools Catalogs**: Track parts and tools used in services
- **Seller Management**: Manage seller information
- **Dashboard**: Comprehensive dashboard with navigation to all modules

## 🛠️ Technologies

- **Framework**: [Next.js 15.5.3](https://nextjs.org/) with React 19
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [TanStack Query (React Query) 5.90](https://tanstack.com/query)
- **Icons**: [Heroicons 2.2](https://heroicons.com/)
- **Alerts**: [SweetAlert2 11.23](https://sweetalert2.github.io/)
- **Code Quality**: ESLint 9 with Next.js configuration

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
- Backend API server (check environment configuration)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/franz1628/maintenancenext.git
cd maintenancenext
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Create a `.env.local` file in the root directory with the following variables:

```env
API_URL_BACKEND=http://localhost:3000
NODE_ENV=development
URL_UPLOADS=http://localhost:3000/uploads
```

Adjust the URLs according to your backend API configuration.

## 🚀 Running the Application

### Development Mode

Start the development server with Turbopack:

```bash
npm run dev
```

The application will be available at `http://localhost:4000`

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
maintenancenext/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── dashboard/  # Dashboard pages and layouts
│   │   ├── login/      # Authentication pages
│   │   └── ...         # Other pages
│   ├── components/     # Reusable UI components
│   │   └── ui/         # UI components (Button, Input, Modal, etc.)
│   ├── config/         # Configuration files
│   │   └── api.ts      # API configuration and fetch utilities
│   ├── features/       # Feature modules
│   │   ├── auth/       # Authentication
│   │   ├── brand/      # Vehicle brands management
│   │   ├── document-type/  # Document types management
│   │   ├── mecanic/    # Mechanics management
│   │   ├── model/      # Vehicle models management
│   │   ├── piece-catalog/  # Parts catalog
│   │   ├── seller/     # Sellers management
│   │   ├── service/    # Services management
│   │   ├── service-catalog/  # Service catalog
│   │   ├── service-detail/   # Service details
│   │   ├── service-detail-catalog/  # Service detail catalog
│   │   ├── tool-catalog/     # Tools catalog
│   │   ├── user/       # Users management
│   │   └── vehicle/    # Vehicles management
│   └── env.ts          # Environment configuration
├── eslint.config.mjs   # ESLint configuration
├── next.config.ts      # Next.js configuration
├── package.json        # Dependencies and scripts
├── postcss.config.mjs  # PostCSS configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🎯 Available Features

### Dashboard Modules

- **Home**: Landing page and navigation
- **Dashboard**: Main dashboard with access to all modules
- **Brand**: Manage vehicle brands
- **Model**: Manage vehicle models
- **Document Type**: Manage document types for users and mechanics
- **User**: User management and administration
- **Vehicle**: Vehicle registration and management
- **Mechanic**: Mechanic profiles and certifications
- **Service**: Service request management
- **Service Catalog**: Predefined service types
- **Service Detail**: Detailed service information
- **Seller**: Seller management
- **Parts Catalog**: Manage parts inventory
- **Tools Catalog**: Track tools available

## 🔐 Authentication

The application uses JWT token-based authentication. Users must log in to access the dashboard and protected routes. The token is stored in local storage and automatically attached to API requests.

## 🌐 API Integration

The application integrates with a backend API. All API calls are configured through the `src/config/api.ts` file which provides:

- Automatic token injection for authenticated requests
- Error handling with user-friendly alerts
- Response parsing and error formatting
- Support for both JSON and FormData requests

## 📝 Code Style

The project follows:

- TypeScript strict mode
- ESLint rules for Next.js and TypeScript
- Functional components with React Hooks
- Feature-based architecture
- Type-safe API calls and data structures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👤 Author

**Franz**

© 2025 Franz

## 🆘 Support

For support and questions, please contact the development team or open an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript
