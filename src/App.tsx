import { BundleProvider } from './context/BundleContext';
import { Builder } from './components/Builder/Builder';
import { ReviewPanel } from './components/ReviewPanel/ReviewPanel';
import styles from './App.module.css';

function App() {
  return (
    <BundleProvider>
      <div className={styles.layout}>
        <Builder />
        <ReviewPanel />
      </div>
    </BundleProvider>
  );
}

export default App;
