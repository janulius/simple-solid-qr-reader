import styles from './App.module.css'
import QrReader from './QrReader'
import { createSignal, For } from 'solid-js'

function App() {
  const [recentlyScanned, setRecentlyScanned] = createSignal([])

  return (
    <div class={styles.App}>
      <h1>QR Code Scanner</h1>
      <div class={styles.QrReaderWrapper}>
        <QrReader onDetect={
          (barcode) => {
            if (barcode) {
              setRecentlyScanned((recentlyScanned) => [...recentlyScanned, barcode.rawValue])
            }
          }}
        />
        <div>
          <h2>Recently Scanned</h2>
          <ul>
            <For each={recentlyScanned()}>
              {(scanValue) => {
                return (
                  <li>
                    {scanValue}
                  </li>
                )
              }}
            </For>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
