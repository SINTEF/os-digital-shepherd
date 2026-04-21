# RESIST Digital Shepherd - Open Source UI

An interactive onboarding and information platform built with **React + TypeScript + Vite**. This open-source UI guides users through climate adaptation data preparation, regional analysis, and integration with digital twin technologies for the RESIST EU project.

**Status**: Fully functional demo application with static data—no external dependencies required.

## Features

- **7-Step Guided Workflow**: Welcome → Regions → Technology → Data Preparation → Submission → Selection → Summary
- **Regional Climate Data**: Pre-configured with 12 European climate regions
- **Embedded Vimeo Tutorials**: Integrated video guides for each step
- **Beautiful UI**: Built with DaisyUI, Tailwind CSS, and Heroicons
- **Self-Contained**: No external APIs or backends needed—perfect for demos and prototypes
- **Static Data**: Hardcoded demo datasets and fake file uploads

## Tech Stack

- **[React](https://react.dev/)**: User interface library
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[Vite](https://vitejs.dev/)**: Lightning-fast build tool
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first styling
- **[DaisyUI](https://daisyui.com/)**: Component library
- **[Heroicons](https://heroicons.com/)**: Beautiful icon set
- **[React Router](https://reactrouter.com/)**: Client-side routing
- **[MobX](https://mobx.js.org/)**: Lightweight state management
- **[Shepherd.js](https://shepherdjs.dev/)**: Interactive guided tours

## Quick Start

### Prerequisites

- **Node.js** (v16 or later)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SINTEF/os-digital-shepherd.git
   cd os-digital-shepherd
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Visit `http://localhost:5173/demo/shepherd/` and log in with:
   - **Username**: `admin`
   - **Password**: `demo`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy.

## Usage

The platform walks users through a structured 7-step workflow:

1. **Welcome** - Introduction and user details
2. **Regions** - Select climate region (12 pre-configured European regions)
3. **Technology** - Learn about AugmentCity Graphical Digital Twin with embedded tutorials
4. **Data Preparation** - Prepare and filter climate data
5. **Data Submission** - Submit datasets (demo: upload with success confirmation)
6. **Data Selection** - Review and select datasets
7. **Summary** - Final review and link to visualization platform

All data is pre-populated for demo purposes. The "Load the Visualization Platform" button opens an external link.

## Project Structure

```
src/
├── App.tsx                 # Main app with routing and modals
├── state.ts               # MobX global state management
├── WelcomeStep.tsx        # Step 1: User onboarding
├── RegionsStep.tsx        # Step 2: Region selection with maps
├── TechnologyStep.tsx     # Step 3: Technology overview + Vimeo videos
├── DataPreparationStep.tsx # Step 4: Data prep with hardcoded examples
├── DataSubmissionStep.tsx  # Step 5: File upload
├── DataSelectionStep.tsx   # Step 6: Dataset selection
├── SummaryStep.tsx        # Step 7: Final summary
├── App.css, index.css     # Styling
└── main.tsx              # React entry point

public/
├── EU_logo.png, RESIST_logo.png
├── regions/              # Regional map images
├── favicon.png
└── update-log.html       # Update log modal content
```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:5173/demo/shepherd/)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Demo Features

https://resist.hcilab.no/demo/shepherd/

### Authentication
- **Credentials**: admin / demo
- Static authentication (no backend required)
- User profile stored in browser localStorage

## Development

### Project Setup

The project uses:
- **MobX** for simple, reactive state management
- **React Router** for single-page navigation
- **Shepherd.js** for optional guided tours
- **Tailwind CSS** for responsive styling

### Adding New Steps

Each step is a component receiving `setStep`, `selectedOption`, and `setSelectedOption` props. Example:

```tsx
const MyStep: React.FC<StepProps> = ({ setStep, selectedOption, setSelectedOption }) => {
  return (
    <div>
      {/* Content */}
      <button onClick={() => setStep(step + 1)}>Next</button>
    </div>
  );
};
```

### Customization

- **Colors**: Modify `tailwind.config.js` theme
- **Content**: Edit component files directly (no external data loading)
- **Logo/Images**: Replace files in `public/` folder

## About RESIST

The **RESIST project** develops adaptive governance tools and technologies to help European regions respond to climate challenges. This Digital Shepherd UI is part of the digital twin ecosystem for climate risk assessment.

The **RESIST project** is funded by EU Horizon Europe, Grant agreement ID: 101093968.

**More info**: [resist-project.eu](https://resist-project.eu)

## License

This project is open source and available under the MIT License. See LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## Support

For issues, questions, or feedback, please open a GitHub issue or contact costas [at] sintef.no.

---