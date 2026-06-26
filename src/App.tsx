import { BundleProvider } from './context/BundleContext';
import { Builder } from './components/Builder/Builder';
import { ReviewPanel } from './components/ReviewPanel/ReviewPanel';

function App() {
  return (
    <BundleProvider>
      <div className="max-w-[1440px] mx-auto px-4 py-5 flex flex-col gap-5 md:grid md:grid-cols-[1fr_320px] md:gap-5 md:items-start lg:grid-cols-[1fr_380px] lg:gap-7 lg:px-6 lg:py-7 xl:flex xl:flex-col xl:gap-6 xl:px-10">
        <Builder />
        <ReviewPanel />
      </div>
    </BundleProvider>
  );
}

export default App;
