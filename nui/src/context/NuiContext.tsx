import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from 'react';

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
  canceled?: boolean;
  refunded?: boolean;
  status?: 'paid' | 'pending' | 'canceled' | 'refunded';
  canceled_by?: string;
  receiver_cid?: string;
  receiver?: string;
  sender_cid?: string;
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
  showQuickBill: boolean;
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
  jobAccess: boolean;
  inspectCitizen: boolean;
  billingStats: any;
}

interface NuiContextValue extends NuiState {
  fetchNearbyPlayers: () => void;
  fetchOnlinePlayers: (query: string) => void;
  closeUI: () => void;
  closeQuickBill: () => void;
  payBill: (billId: string) => void;
  billPlayer: (cid: string, reason: string, amount: number) => void;
  quickBillPlayer: (cid: string, reason: string, amount: number) => void;
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
    console.log(`[NUI] Would call ${eventName} with:`, data);
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
    showQuickBill: false,
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
    jobAccess: false,
    inspectCitizen: false,
    billingStats: {},
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
      } else if (data.type === 'openQuickBill') {
        const nuiData = data.data;
        setState(prev => ({
          ...prev,
          showQuickBill: true,
          localeValues: nuiData?.locale || {},
        }));
      } else if (data.type === 'updatePlayerBills') {
        setState(prev => ({
          ...prev,
          selectedPlayerBills: Array.isArray(data.bills) ? data.bills : [],
          showSelectedPlayerMenu: true,
          showMenu: true
        }));
      } else if (data.type === 'updateBillingStats') {
        setState(prev => ({
          ...prev,
          billingStats: data.stats || {}
        }));
      } else if (data.type === 'billStatusUpdated') {
        const updatedBill = data.bill;
        if (!updatedBill || !updatedBill.id) return;
        
        setState(prev => {
          const newState = { ...prev };
          
          newState.myBills = prev.myBills.map(bill => 
            bill.id === updatedBill.id ? updatedBill : bill
          );
          
          if ((updatedBill.status === 'canceled' || updatedBill.status === 'refunded') && 
              prev.myBills.some(bill => bill.id === updatedBill.id)) {
            newState.myBills = prev.myBills.filter(bill => bill.id !== updatedBill.id);
            
            if (!prev.billingHistory.some(bill => bill.id === updatedBill.id)) {
              newState.billingHistory = [updatedBill, ...prev.billingHistory];
            }
          }
          
          newState.societyBills = prev.societyBills.map(bill => 
            bill.id === updatedBill.id ? updatedBill : bill
          );
          
          newState.billingHistory = prev.billingHistory.map(bill => 
            bill.id === updatedBill.id ? updatedBill : bill
          );
          
          newState.selectedPlayerBills = prev.selectedPlayerBills.map(bill => 
            bill.id === updatedBill.id ? updatedBill : bill
          );
          
          if (prev.selectedBill && prev.selectedBill.id === updatedBill.id) {
            newState.selectedBill = updatedBill;
          }
          
          if (updatedBill.status !== 'pending' && 
              (prev.myBills.some(bill => bill.id === updatedBill.id) || 
               prev.societyBills.some(bill => bill.id === updatedBill.id))) {
            if (isEnvBrowser()) {
              setTimeout(() => {
                fetchNui('peleg-billing:callback:getBillingStats', {
                  societyMode: prev.showSocietyMenu
                });
              }, 500);
            } else {
              fetchNui('peleg-billing:callback:getBillingStats', {
                societyMode: prev.showSocietyMenu
              });
            }
          }
          
          return newState;
        });
      } else if (data.type === 'forceCloseQuickBill') {
        setState(prev => ({
          ...prev,
          showQuickBill: false
        }));
      } else if (data.type === 'updatePlayers') {
        const players = Array.isArray(data.players) ? data.players : [];
        setState(prev => ({ 
          ...prev, 
          players
        }));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (state.selectedBill) {
          setState(prev => ({ ...prev, selectedBill: null }));
          e.preventDefault();
        } else if (state.selectedPlayer && state.showSelectedPlayerMenu) {
          setState(prev => ({
            ...prev,
            showSelectedPlayerMenu: false,
            selectedPlayer: null,
            selectedPlayerBills: [],
            showMenu: true
          }));
          e.preventDefault();
        } else if (state.showMenu) {
          closeUI();
          e.preventDefault();
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

  const fetchNearbyPlayers = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      console.log('[QuickBill] Fetching nearby players...');
      
      const response = await fetchNui('peleg-billing:callback:getNearbyPlayers');
      
      if (Array.isArray(response)) {
        setState(prev => ({ 
          ...prev, 
          nearbyPlayers: response.map((p: any) => ({
            id: p.id,
            name: p.name || 'Unknown',
            cid: p.cid || p.id
          }))
        }));
      } else if (response && Array.isArray(response.players)) {
        setState(prev => ({ 
          ...prev, 
          nearbyPlayers: response.players.map((p: any) => ({
            id: p.id,
            name: p.name || 'Unknown',
            cid: p.cid || p.id
          }))
        }));
      } else {
        setState(prev => ({ ...prev, nearbyPlayers: [] }));
      }
    } catch (error) {
      console.error('Error fetching nearby players:', error);
      setState(prev => ({ ...prev, nearbyPlayers: [] }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const fetchOnlinePlayers = useCallback(async (query: string) => {
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
  }, []);

  const closeUI = useCallback(() => {
    setState(prev => ({ ...prev, isClosing: true }));
    fetchNui('peleg-billing:callback:close', {});
    setTimeout(() => {
      setState(prev => ({ ...prev, showMenu: false, isClosing: false }));
    }, 300); 
  }, []);

  const closeQuickBill = useCallback(() => {
    setState(prev => ({ ...prev, showQuickBill: false }));
    
    try {
      fetchNui('peleg-billing:callback:closeQuickBill');
    } catch (error) {
      console.error('Error closing QuickBill UI:', error);
    }
  }, []);

  const payBill = useCallback(async (billId: string) => {
    const bill = state.myBills.find(bill => bill.id === billId);
    
    if (bill) {
      try {
        const balanceResp = await fetchNui('peleg-billing:callback:checkBalance', { amount: bill.amount });
        
        if (balanceResp?.hasEnough === false) {
          fetchNui('peleg-billing:callback:notify', {
            message: state.localeValues['notEnoughMoney'] || 'You do not have enough money to pay this bill.',
            title: state.localeValues['error'] || 'Error',
            type: 'error'
          });
          return;
        }
        
        fetchNui('peleg-billing:callback:payBill', { billId, payFromJobAccount: false });
        
        setState(prev => {
          const updatedBill = { ...bill, status: 'paid', paid: true };
          
          return {
            ...prev,
            myBills: prev.myBills.filter(b => b.id !== billId),
            billingHistory: [updatedBill, ...prev.billingHistory],
            selectedBill: prev.selectedBill?.id === billId ? updatedBill : prev.selectedBill
          };
        });
        
        fetchNui('peleg-billing:callback:notify', {
          message: `${state.localeValues['billPaid'] || 'Bill paid successfully'} - $${bill.amount}`,
          title: state.localeValues['success'] || 'Success',
          type: 'success'
        });
        
        setTimeout(() => {
          fetchNui('peleg-billing:callback:getBillingStats', {});
        }, 500);
      } catch (error) {
        console.error('Error paying bill:', error);
        fetchNui('peleg-billing:callback:notify', {
          message: state.localeValues['errorPayingBill'] || 'Error processing payment.',
          title: state.localeValues['error'] || 'Error',
          type: 'error'
        });
      }
    }
  }, [state.myBills, state.localeValues]);

  const billPlayer = useCallback(async (cid: string, reason: string, amount: number) => {
    if (!cid || !reason || !amount) {
      fetchNui('peleg-billing:callback:notify', {
        message: state.localeValues['emptyFields'] || 'Please fill in all fields.',
        title: state.localeValues['error'] || 'Error',
        type: 'error'
      });
      return;
    }
    
    if (amount <= 0) {
      fetchNui('peleg-billing:callback:notify', {
        message: state.localeValues['invalidAmount'] || 'Amount must be greater than 0.',
        title: state.localeValues['error'] || 'Error',
        type: 'error'
      });
      return;
    }

    try {
      await fetchNui('peleg-billing:callback:billPlayer', { cid, reason, amount });
      
      fetchNui('peleg-billing:callback:notify', {
        message: state.localeValues['billSent'] || 'Bill sent successfully.',
        title: state.localeValues['success'] || 'Success',
        type: 'success'
      });
      
      setTimeout(() => {
        fetchNui('peleg-billing:callback:getBillingStats', {
          societyMode: state.showSocietyMenu
        });
      }, 500);
      
      if (state.selectedPlayer) {
        setState(prev => ({
          ...prev,
          selectedPlayer: null,
          showSelectedPlayerMenu: false,
          showMenu: true
        }));
      }
    } catch (error) {
      console.error('Error sending bill:', error);
      fetchNui('peleg-billing:callback:notify', {
        message: state.localeValues['errorSendingBill'] || 'Error sending bill.',
        title: state.localeValues['error'] || 'Error',
        type: 'error'
      });
    }
  }, [state.localeValues, state.selectedPlayer, state.showSocietyMenu]);

  const quickBillPlayer = useCallback(async (cid: string, reason: string, amount: number) => {
    try {
      await fetchNui('peleg-billing:callback:quickBillPlayer', { cid, reason, amount });
    } catch (error) {
      console.error('Error sending quick bill:', error);
    }
  }, []);

  const selectBill = useCallback((bill: Bill) => {
    setState(prev => ({ ...prev, selectedBill: bill }));
  }, []);

  const selectPlayer = useCallback((player: Player) => {
    setState(prev => ({ ...prev, selectedPlayer: player }));
  }, []);

  const clearSelectedPlayer = useCallback(() => {
    setState(prev => ({ ...prev, selectedPlayer: null }));
  }, []);

  const fetchPlayerBills = useCallback(async (cid: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await fetchNui('peleg-billing:callback:fetchPlayerBills', { cid });
      
      if (response && Array.isArray(response.bills)) {
        setState(prev => ({
          ...prev,
          selectedPlayerBills: response.bills,
          showSelectedPlayerMenu: true,
          isLoading: false
        }));
      } else {
        setState(prev => ({
          ...prev,
          selectedPlayerBills: [],
          showSelectedPlayerMenu: true,
          isLoading: false
        }));

        fetchNui('peleg-billing:callback:notify', {
          message: state.localeValues['noPlayerBills'] || 'No bills found for this player.',
          title: state.localeValues['info'] || 'Information',
          type: 'primary'
        });
      }
    } catch (error) {
      console.error('Error fetching player bills:', error);
      setState(prev => ({ 
        ...prev, 
        selectedPlayerBills: [],
        showSelectedPlayerMenu: true,
        isLoading: false 
      }));
    }
  }, [state.localeValues]);

  const getLocale = useCallback((key: string, defaultValue: string = '') => {
    return state.localeValues[key] || defaultValue;
  }, [state.localeValues]);

  const toggleDummyMode = useCallback(() => {
    setState(prev => {
      if (prev.developmentMode) {
        return { ...prev, developmentMode: false };
      } else {
        return { ...prev, developmentMode: true };
      }
    });
  }, []);

  const contextValue = useMemo(() => ({
    ...state,
    fetchNearbyPlayers,
    fetchOnlinePlayers,
    closeUI,
    closeQuickBill,
    payBill,
    billPlayer,
    quickBillPlayer,
    selectBill,
    selectPlayer,
    clearSelectedPlayer,
    fetchPlayerBills,
    getLocale,
    toggleDummyMode,
    setState,
    closePlayerBills
  }), [
    state,
    fetchNearbyPlayers,
    fetchOnlinePlayers,
    closeUI,
    closeQuickBill,
    payBill,
    billPlayer,
    quickBillPlayer,
    selectBill,
    selectPlayer,
    clearSelectedPlayer,
    fetchPlayerBills,
    getLocale,
    toggleDummyMode,
    closePlayerBills
  ]);

  return (
    <NuiContext.Provider value={contextValue}>
      {children}
    </NuiContext.Provider>
  );
};

export const useNui = () => {
  const context = useContext(NuiContext);
  if (!context) {
    throw new Error('useNui must be used within a NuiProvider');
  }
  return context;
}; 