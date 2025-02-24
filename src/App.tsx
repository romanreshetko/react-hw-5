import { useState } from 'react';
import './App.css'
import { ItemGrid } from './components/ItemGrid'
import { SidePanel } from './components/SidePanel'
import { TopNav } from './components/TopNav'
import { BrowserRouter, Routes, Route } from 'react-router';
import { ItemInfo } from './components/ItemInfo';
import { Categories } from './components/Categories';
import { UserProfile } from './components/UserProfile';

export interface FilterState {
  name: string;
  available: boolean;
  categoryName: string;
}

function App() {

  const [panelOpened, setPanelOpened] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<FilterState>({
    name: '',
    available: false,
    categoryName: 'all'
  });

  const handleToggleSidePanel = () => {
      setPanelOpened(!panelOpened);
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <TopNav onTogglePanel={handleToggleSidePanel}></TopNav>
              <SidePanel opened={panelOpened} setOpened={setPanelOpened} setFilterState={setFilterState}></SidePanel>
              <ItemGrid name={filterState.name} available={filterState.available} categoryName={filterState.categoryName}></ItemGrid>
            </>
          } />
          <Route path="/products/:index" element={<ItemInfo />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
