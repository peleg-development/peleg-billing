import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Bill {
  id: string;
  amount: number;
  reason: string;
  billedBy: {
    name: string;
    job: string;
  };
  date: string;
  time: string;
  paid: boolean;
}

export interface Player {
  id: string;
  name: string;
  cid: string;
}

export interface LocaleValues {
  [key: string]: string;
}

interface NuiState {
  showMenu: boolean;
  cid: string;
  myBills: Bill[];
  societyBills: Bill[];
  billingHistory: Bill[];
  showSocietyMenu: boolean;
  showInspectCitizen: boolean;
  canBill: boolean;
  players: Player[];
  nearbyPlayers: Player[];
  selectedBill: Bill | null;
  selectedPlayer: Player | null;
  selectedPlayerBills: Bill[];
  isLoading: boolean;
  localeValues: LocaleValues;
  developmentMode: boolean;
  showSelectedPlayerMenu: boolean;
  isClosing: boolean;
}

interface NuiContextValue extends NuiState {
  fetchNearbyPlayers: () => void;
  fetchOnlinePlayers: (query: string) => void;
  closeUI: () => void;
  payBill: (billId: string) => void;
  billPlayer: (cid: string, reason: string, amount: number) => void;
  selectBill: (bill: Bill) => void;
  selectPlayer: (player: Player) => void;
  clearSelectedPlayer: () => void;
  fetchPlayerBills: (cid: string) => void;
  getLocale: (key: string, defaultValue?: string) => string;
  toggleDummyMode: () => void;
  setState: React.Dispatch<React.SetStateAction<NuiState>>;
  closePlayerBills: () => void;
}

const NuiContext = createContext<NuiContextValue | null>(null);

const isEnvBrowser = () => !(window as any).invokeNative;

const fetchNui = async (eventName: string, data: any = {}) => {
  if (isEnvBrowser()) {
    console.log(`[NUI] Simulating fetch to ${eventName} with payload:`, data);
    return { ok: true };
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  const resourceName = (window as any).GetParentResourceName
    ? (window as any).GetParentResourceName()
    : 'peleg-billing';

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);
  return await resp.json();
};

export const NuiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<NuiState>({
    showMenu: false,
    cid: '',
    myBills: [],
    societyBills: [],
    billingHistory: [],
    showSocietyMenu: false,
    showInspectCitizen: false,
    canBill: false,
    players: [],
    nearbyPlayers: [],
    selectedBill: null,
    selectedPlayer: null,
    selectedPlayerBills: [],
    isLoading: false,
    localeValues: {},
    developmentMode: false,
    showSelectedPlayerMenu: false,
    isClosing: false,
  });

  useEffect(() => {
    if (isEnvBrowser()) {
      const dummyData = {
        showMenu: true,
        cid: 'DUMMY12345',
        myBills: [
          {
            id: 'bill1',
            amount: 350.00,
            reason: 'Medical Services',
            billedBy: { name: 'Dr. Smith', job: 'EMS' },
            date: '2023-05-15',
            time: '14:30',
            paid: false
          },
          {
            id: 'bill2',
            amount: 120.75,
            reason: 'Speeding Ticket',
            billedBy: { name: 'Officer Johnson', job: 'Police' },
            date: '2023-05-12',
            time: '09:45',
            paid: false
          },
          {
            id: 'bill3',
            amount: 85.50,
            reason: 'Vehicle Repair',
            billedBy: { name: 'Mike\'s Mechanics', job: 'Mechanic' },
            date: '2023-05-10',
            time: '16:20',
            paid: true
          }
        ],
        societyBills: [
          {
            id: 'soc1',
            amount: 560.00,
            reason: 'Equipment Purchase',
            billedBy: { name: 'Supply Co.', job: 'Admin' },
            date: '2023-05-14',
            time: '11:15',
            paid: true
          },
          {
            id: 'soc2',
            amount: 890.25,
            reason: 'Building Maintenance',
            billedBy: { name: 'City Services', job: 'Maintenance' },
            date: '2023-05-09',
            time: '15:40',
            paid: true
          }
        ],
        billingHistory: [
          {
            id: 'hist1',
            amount: 230.00,
            reason: 'Property Tax',
            billedBy: { name: 'City Hall', job: 'Government' },
            date: '2023-04-30',
            time: '10:00',
            paid: true
          },
          {
            id: 'hist2',
            amount: 75.00,
            reason: 'Weapons License',
            billedBy: { name: 'Officer Williams', job: 'Police' },
            date: '2023-04-25',
            time: '13:20',
            paid: true
          }
        ],
        nearbyPlayers: [
          { id: 'player1', name: 'John Doe', cid: 'CID123456' },
          { id: 'player2', name: 'Jane Smith', cid: 'CID789012' },
          { id: 'player3', name: 'Robert Johnson', cid: 'CID345678' }
        ],
        players: [
          { id: 'player4', name: 'Alice Williams', cid: 'CID901234' },
          { id: 'player5', name: 'Bob Anderson', cid: 'CID567890' },
          { id: 'player6', name: 'Carol Davis', cid: 'CID234567' }
        ],
        showSocietyMenu: true,
        showInspectCitizen: true,
        canBill: true,
        localeValues: {
          'billHub': 'Bills',
          'currencySymbol': '$',
          'closeButton': 'Close',
          'myBillsLabel': 'My Bills',
          'myBillsHeading': 'My Bills',
          'noBillsAvailable': 'No Bills Available',
          'noBillsAvailableDescription': 'You currently don\'t have any bills. Check back later!',
          'paidStatus': 'Paid',
          'pendingStatus': 'Pending',
          'viewReceipt': 'View Receipt',
          'viewDetails': 'View Details',
          'historyLabel': 'History',
          'billingHistoryHeading': 'Billing History',
          'societyLabel': 'Society',
          'societyBillsHeading': 'Society Bills',
          'billPlayerLabel': 'Bill Player',
          'billPlayerHeading': 'Bill Player',
          'inspectLabel': 'Inspect',
          'inspectCitizenHeading': 'Inspect Citizen'
        }
      };

      setState(prev => ({
        ...prev,
        ...dummyData
      }));
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { data } = event;

      if (data.type === 'openMe') {
        const nuiData = data.data;
        setState(prev => ({
          ...prev,
          showMenu: true,
          cid: nuiData.cid || '',
          myBills: Array.isArray(nuiData.myBills) ? nuiData.myBills : [],
          societyBills: Array.isArray(nuiData.societyBills) ? nuiData.societyBills : [],
          billingHistory: Array.isArray(nuiData.billingHistory) ? nuiData.billingHistory : [],
          showSocietyMenu: nuiData.jobAccess || false,
          showInspectCitizen: nuiData.inspectCitizen || false,
          canBill: nuiData.canBill || false,
          localeValues: nuiData.locale || {}
        }));
      } else if (data.type === 'updatePlayerBills') {
        console.log('Received bills data:', data.bills);
        setState(prev => ({
          ...prev,
          selectedPlayerBills: Array.isArray(data.bills) ? data.bills : [],
          showSelectedPlayerMenu: true  
        }));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (state.selectedBill) {
          setState(prev => ({ ...prev, selectedBill: null }));
        } else if (state.selectedPlayer && state.showSelectedPlayerMenu) {
          setState(prev => ({
            ...prev,
            showSelectedPlayerMenu: false,
            selectedPlayer: null,
            selectedPlayerBills: []
          }));
        } else if (state.showMenu) {
          closeUI();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.showMenu, state.selectedBill, state.selectedPlayer, state.showSelectedPlayerMenu]);

  const fetchNearbyPlayers = async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    if (state.developmentMode) {
      setTimeout(() => {
        setState(prev => ({ 
          ...prev, 
          nearbyPlayers: [
            { id: 'player1', name: 'John Doe', cid: 'CID123456' },
            { id: 'player2', name: 'Jane Smith', cid: 'CID789012' },
            { id: 'player3', name: 'Robert Johnson', cid: 'CID345678' }
          ],
          isLoading: false
        }));
      }, 600);
      return;
    }

    try {
      if (isEnvBrowser()) {
        setTimeout(() => {
          setState(prev => ({ 
            ...prev, 
            nearbyPlayers: [
              { id: 'player1', name: 'John Doe', cid: 'CID123456' },
              { id: 'player2', name: 'Jane Smith', cid: 'CID789012' },
              { id: 'player3', name: 'Robert Johnson', cid: 'CID345678' }
            ],
            isLoading: false
          }));
        }, 1000);
        return;
      }

      const response = await fetchNui('peleg-billing:callback:getNearbyPlayers', {});
      setState(prev => ({ 
        ...prev, 
        nearbyPlayers: Array.isArray(response) ? response : [],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error fetching nearby players:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const fetchOnlinePlayers = async (query: string) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await fetchNui('peleg-billing:callback:getOnlinePlayers', { query });
      setState(prev => ({ 
        ...prev, 
        players: Array.isArray(response) ? response : [],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error fetching online players:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const closeUI = () => {
    setState(prev => ({ ...prev, isClosing: true }));
    fetchNui('peleg-billing:callback:close', {});
    setTimeout(() => {
      setState(prev => ({ ...prev, showMenu: false, isClosing: false }));
    }, 300); 
    
  };

  const payBill = async (billId: string) => {
    const bill = state.myBills.find(bill => bill.id === billId);
    
    if (bill) {
      try {
        const balanceResp = await fetchNui('peleg-billing:callback:checkBalance', { amount: bill.amount });
        
        if (balanceResp.hasEnough) {
          const response = await fetchNui('peleg-billing:callback:payBill', { 
            billId, 
            payFromJobAccount: false 
          });
          
          if (response === 'ok') {
            setState(prev => ({
              ...prev,
              myBills: prev.myBills.filter(b => b.id !== billId),
              billingHistory: [...prev.billingHistory, { ...bill, paid: true }],
              selectedBill: null
            }));
            
            fetchNui('peleg-billing:callback:notify', {
              title: 'Success',
              message: 'Bill paid successfully',
              type: 'success'
            });
          }
        } else {
          fetchNui('peleg-billing:callback:notify', {
            title: 'Error',
            message: 'You do not have enough money to pay this bill',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error paying bill:', error);
        fetchNui('peleg-billing:callback:notify', {
          title: 'Error',
          message: 'Failed to pay the bill',
          type: 'error'
        });
      }
    }
  };

  const billPlayer = async (cid: string, reason: string, amount: number) => {
    if (!cid || !reason || !amount) {
      return;
    }

    try {
      const response = await fetchNui('peleg-billing:callback:billPlayer', {
        cid,
        reason,
        amount: parseFloat(amount.toString())
      });

      if (response === 'ok') {
        setState(prev => ({ ...prev, selectedPlayer: null }));
        
        fetchNui('peleg-billing:callback:notify', {
          title: 'Success',
          message: 'Bill sent successfully',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error billing player:', error);
      fetchNui('peleg-billing:callback:notify', {
        title: 'Error',
        message: 'Failed to send bill',
        type: 'error'
      });
    }
  };

  const selectBill = (bill: Bill) => {
    setState(prev => ({ ...prev, selectedBill: bill }));
  };

  const selectPlayer = (player: Player) => {
    setState(prev => ({ ...prev, selectedPlayer: player }));
  };

  const clearSelectedPlayer = () => {
    setState(prev => ({ ...prev, selectedPlayer: null }));
  };

  const fetchPlayerBills = async (cid: string) => {
    try {
      const player = state.players.find(p => p.cid === cid || p.id === cid) || {
        id: cid,
        name: 'Player ' + cid,
        cid: cid
      };
      
      setState(prev => ({ 
        ...prev, 
        selectedPlayer: player,
        showSelectedPlayerMenu: true
      }));
      
      try {
        await fetchNui('peleg-billing:callback:fetchPlayerBills', { cid });
        
        setTimeout(() => {
          if (state.selectedPlayerBills.length === 0) {
            console.log('No bills received from server, using mock bills');
            setState(prev => ({
              ...prev,
              selectedPlayerBills: [
                {
                  id: 'dummy1',
                  amount: 150,
                  reason: 'Fine',
                  billedBy: { name: 'System', job: 'police' },
                  date: new Date().toISOString().split('T')[0],
                  time: new Date().toTimeString().split(' ')[0].substring(0, 5),
                  paid: false
                }
              ]
            }));
          }
        }, 2000);
      } catch (fetchError) {
        console.error('Error fetching player bills:', fetchError);
        
        setState(prev => ({
          ...prev,
          selectedPlayerBills: [
            {
              id: 'dummy1',
              amount: 150,
              reason: 'Fine',
              billedBy: { name: 'System', job: 'police' },
              date: new Date().toISOString().split('T')[0],
              time: new Date().toTimeString().split(' ')[0].substring(0, 5),
              paid: false
            }
          ]
        }));
      }
    } catch (error) {
      console.error('Critical error in fetchPlayerBills:', error);
      
      setState(prev => ({
        ...prev,
        showSelectedPlayerMenu: true,
        selectedPlayer: { id: cid, name: 'Player ' + cid, cid: cid },
        selectedPlayerBills: [
          {
            id: 'dummy-fallback',
            amount: 100,
            reason: 'System Fine',
            billedBy: { name: 'System', job: 'admin' },
            date: new Date().toISOString().split('T')[0],
            time: new Date().toTimeString().split(' ')[0].substring(0, 5),
            paid: false
          }
        ]
      }));
    }
  };

  const getLocale = (key: string, defaultValue: string = '') => {
    return state.localeValues[key] || defaultValue;
  };

  const toggleDummyMode = () => {
    if (state.developmentMode) {
      setState(prev => ({ ...prev, developmentMode: false }));
    } else {
      loadDummyData();
    }
  };

  const loadDummyData = () => {
    const dummyData = {
      myBills: [
        {
          id: 'bill1',
          amount: 350.00,
          reason: 'Medical Services',
          billedBy: { name: 'Dr. Smith', job: 'EMS' },
          date: '2023-05-15',
          time: '14:30',
          paid: false
        },
        {
          id: 'bill2',
          amount: 120.75,
          reason: 'Speeding Ticket',
          billedBy: { name: 'Officer Johnson', job: 'Police' },
          date: '2023-05-12',
          time: '09:45',
          paid: false
        },
        {
          id: 'bill3',
          amount: 85.50,
          reason: 'Vehicle Repair',
          billedBy: { name: 'Mike\'s Mechanics', job: 'Mechanic' },
          date: '2023-05-10',
          time: '16:20',
          paid: true
        }
      ],
      societyBills: [
        {
          id: 'soc1',
          amount: 560.00,
          reason: 'Equipment Purchase',
          billedBy: { name: 'Supply Co.', job: 'Admin' },
          date: '2023-05-14',
          time: '11:15',
          paid: true
        },
        {
          id: 'soc2',
          amount: 890.25,
          reason: 'Building Maintenance',
          billedBy: { name: 'City Services', job: 'Maintenance' },
          date: '2023-05-09',
          time: '15:40',
          paid: true
        }
      ],
      billingHistory: [
        {
          id: 'hist1',
          amount: 230.00,
          reason: 'Property Tax',
          billedBy: { name: 'City Hall', job: 'Government' },
          date: '2023-04-30',
          time: '10:00',
          paid: true
        },
        {
          id: 'hist2',
          amount: 75.00,
          reason: 'Weapons License',
          billedBy: { name: 'Officer Williams', job: 'Police' },
          date: '2023-04-25',
          time: '13:20',
          paid: true
        }
      ],
      nearbyPlayers: [
        { id: 'player1', name: 'John Doe', cid: 'CID123456' },
        { id: 'player2', name: 'Jane Smith', cid: 'CID789012' },
        { id: 'player3', name: 'Robert Johnson', cid: 'CID345678' }
      ],
      players: [
        { id: 'player4', name: 'Alice Williams', cid: 'CID901234' },
        { id: 'player5', name: 'Bob Anderson', cid: 'CID567890' },
        { id: 'player6', name: 'Carol Davis', cid: 'CID234567' }
      ],
      showSocietyMenu: true,
      showInspectCitizen: true,
      canBill: true
    };

    setState(prev => ({
      ...prev,
      developmentMode: true,
      myBills: dummyData.myBills,
      societyBills: dummyData.societyBills,
      billingHistory: dummyData.billingHistory,
      nearbyPlayers: dummyData.nearbyPlayers,
      players: dummyData.players,
      showSocietyMenu: dummyData.showSocietyMenu,
      showInspectCitizen: dummyData.showInspectCitizen,
      canBill: dummyData.canBill
    }));
  };

  const closePlayerBills = () => {
    setState(prev => ({
      ...prev,
      showSelectedPlayerMenu: false,
      selectedPlayer: null,
      selectedPlayerBills: []
    }));
  };

  const contextValue: NuiContextValue = {
    ...state,
    fetchNearbyPlayers,
    fetchOnlinePlayers,
    closeUI,
    payBill,
    billPlayer,
    selectBill,
    selectPlayer,
    clearSelectedPlayer,
    fetchPlayerBills,
    getLocale,
    toggleDummyMode,
    setState,
    closePlayerBills
  };

  return <NuiContext.Provider value={contextValue}>{children}</NuiContext.Provider>;
};

export const useNui = () => {
  const context = useContext(NuiContext);
  if (!context) {
    throw new Error('useNui must be used within a NuiProvider');
  }
  return context;
}; 