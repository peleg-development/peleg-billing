new Vue({
    el: '#app',
    data: {
        Cid: '12345',
        view: 'myBills',
        showbillmenu: false,
        showPlayerBills: false, 
        playerSearch: '',
        billReason: '',
        billAmount: 0,
        myBills: [
            {
                id: 'bill1',
                amount: 150.00,
                reason: 'Monthly Rent',
                sender: 'Landlord',
                billedBy: { name: 'John Doe', job: 'Property Manager' },
                date: '2024-12-01',
                time: '10:00 AM',
                paid: false
            },
            {
                id: 'bill2',
                amount: 75.50,
                reason: 'Utility Payment',
                sender: 'Utility Company',
                billedBy: { name: 'Jane Smith', job: 'Utility Manager' },
                date: '2024-11-15',
                time: '2:30 PM',
                paid: true
            }
        ],
        societyBills: [
            {
                id: 'socBill1',
                amount: 300.00,
                reason: 'Community Maintenance',
                sender: 'Society Board',
                billedBy: { name: 'Alice Johnson', job: 'Society Treasurer' },
                date: '2024-10-20',
                time: '9:00 AM',
                paid: false
            },
            {
                id: 'socBill1',
                amount: 300.00,
                reason: 'Community Maintenance',
                sender: 'Society Board',
                billedBy: { name: 'Alice Johnson', job: 'Society Treasurer' },
                date: '2024-10-20',
                time: '9:00 AM',
                paid: false
            },     {
                id: 'socBill1',
                amount: 300.00,
                reason: 'Community Maintenance',
                sender: 'Society Board',
                billedBy: { name: 'Alice Johnson', job: 'Society Treasurer' },
                date: '2024-10-20',
                time: '9:00 AM',
                paid: false
            },     {
                id: 'socBill1',
                amount: 300.00,
                reason: 'Community Maintenance',
                sender: 'Society Board',
                billedBy: { name: 'Alice Johnson', job: 'Society Treasurer' },
                date: '2024-10-20',
                time: '9:00 AM',
                paid: false
            },     {
                id: 'socBill1',
                amount: 300.00,
                reason: 'Community Maintenance',
                sender: 'Society Board',
                billedBy: { name: 'Alice Johnson', job: 'Society Treasurer' },
                date: '2024-10-20',
                time: '9:00 AM',
                paid: false
            },
            {
                id: 'socBill2',
                amount: 120.75,
                reason: 'Event Funding',
                sender: 'Event Committee',
                billedBy: { name: 'Bob Lee', job: 'Event Coordinator' },
                date: '2024-09-05',
                time: '11:15 AM',
                paid: true
            }
        ],
        billingHistory: [
            {
                id: 'histBill1',
                amount: 200.00,
                reason: 'Security Services',
                sender: 'Security Company',
                billedBy: { name: 'Carol King', job: 'Security Manager' },
                date: '2024-08-10',
                time: '3:45 PM',
                paid: true
            },
            {
                id: 'histBill2',
                amount: 50.00,
                reason: 'Parking Fees',
                sender: 'Parking Authority',
                billedBy: { name: 'David Brown', job: 'Parking Supervisor' },
                date: '2024-07-22',
                time: '1:20 PM',
                paid: true
            }
        ],
        players: [
            { id: 'player1', name: 'Michael Scott', cid: 'C001' },
            { id: 'player2', name: 'Dwight Schrute', cid: 'C002' },
            { id: 'player3', name: 'Jim Halpert', cid: 'C003' },
            { id: 'player4', name: 'Pam Beesly', cid: 'C004' },
            { id: 'player5', name: 'Stanley Hudson', cid: 'C005' }
        ],
        newBill: {
            reason: '',
            amount: 0
        },
        nearbyPlayers: [
            { id: '1', name: 'Angela Martin', cid: 'C006' },
            { id: '2', name: 'Kevin Malone', cid: 'C007' },
            { id: '3', name: 'Oscar Martinez', cid: 'C008' }
        ],
        showBillDetails: false,
        selectedBill: {},
        selectedPlayer: null,
        loadingPlayers: false,
        searchQuery: '',
        selectedPlayerBills: [
            {
                id: 'selBill1',
                amount: 100.00,
                reason: 'Late Fee',
                billedBy: { name: 'John Doe', job: 'Property Manager' },
                date: '2024-12-05'
            },
            {
                id: 'selBill1',
                amount: 100.00,
                reason: 'Late Fee',
                billedBy: { name: 'John Doe', job: 'Property Manager' },
                date: '2024-12-05'
            },       {
                id: 'selBill1',
                amount: 100.00,
                reason: 'Late Fee',
                billedBy: { name: 'John Doe', job: 'Property Manager' },
                date: '2024-12-05'
            },       {
                id: 'selBill1',
                amount: 100.00,
                reason: 'Late Fee',
                billedBy: { name: 'John Doe', job: 'Property Manager' },
                date: '2024-12-05'
            },
            {
                id: 'selBill2',
                amount: 45.00,
                reason: 'Damage Deposit',
                billedBy: { name: 'Jane Smith', job: 'Utility Manager' },
                date: '2024-11-20'
            }
        ]
    },
    computed: {
        filteredPlayers() {
            if (!this.searchQuery) return this.players;
            return this.players.filter(player =>
                player.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                player.cid.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        filteredNearByPlayers() {
            if (!this.playerSearch) return this.nearbyPlayers;
    
            const filtered = this.nearbyPlayers.filter(player =>
                player.name.toLowerCase().includes(this.playerSearch.toLowerCase()) ||
                player.cid.toLowerCase().includes(this.playerSearch.toLowerCase())
            );
    
            return filtered;
        },
        scaleStyle() {
            return {
                display: this.showbillmenu ? 'block' : 'none',
                transform: `scale(0.8)`,
                transformOrigin: 'center'
            }
        }
    },
    methods: {
        selectPlayer(player) {
            this.selectedPlayer = player;
            this.playerSearch = '';
            this.filteredNearByPlayers = [];
        },
        clearSelection() {
            this.selectedPlayer = null;
        },
        
        setView(view) {
            if (this.view !== view) {
                this.view = view;
                if (this.view === 'billPlayer') {
                    // this.fetchNearbyPlayers().then(() => {
                    //     // if (this.nearbyPlayers.length > 0) {
                    //     //     const randomIndex = Math.floor(Math.random() * this.nearbyPlayers.length);
                    //     //     this.selectedPlayer = this.nearbyPlayers[randomIndex];
                    //     // }
                    //     // this.view = view;
                    //     const randomIndex = Math.floor(Math.random() * this.nearbyPlayers.length);
                    //     this.selectedPlayer = this.nearbyPlayers[randomIndex];
                    // });
                    // this.selectedPlayer = this.nearbyPlayers[0];
                }
            }
        },

        billPlayer() {
            if (!this.selectedPlayer || !this.billReason || !this.billAmount) {
                return;
            }
        
            fetch(`https://${GetParentResourceName()}/krs-billing:callback:billPlayer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cid: this.selectedPlayer.cid,
                    reason: this.billReason,
                    amount: parseFloat(this.billAmount)
                })
            }).then(response => response.json())
            .then(resp => {
                if (resp === 'ok') {
                    this.billReason = '';
                    this.billAmount = 0;
                    this.selectedPlayer = null;
                }
            });
        },

        refundBill(billId) {
            fetch(`https://${GetParentResourceName()}/krs-billing:callback:refundBill`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ billId: billId })
            }).then(response => response.json()).then(resp => {
                if (resp === 'ok') {
                    this.$notify({ title: 'Success', message: 'Bill refunded successfully', type: 'success' });
                } else {
                    this.$notify({ title: 'Error', message: 'Failed to refund the bill', type: 'error' });
                }
            });
        },

        showDetails(bill) {
            this.selectedBill = bill;
            this.showBillDetails = true;
        },

        closeDetails() {
            this.showBillDetails = false;
        },

        markAsPaid(billId) {
            const bill = this.myBills.find(bill => bill.id === billId);
            if (bill) {
                fetch(`https://${GetParentResourceName()}/krs-billing:callback:payBill`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        billId: billId,
                        payFromJobAccount: false
                    })
                }).then(response => response.json()).then(resp => {
                    if (resp === 'ok') {
                        bill.paid = true;
                        this.myBills = this.myBills.filter(bill => bill.id !== billId);
                        this.billingHistory.push(bill);
                        this.closeDetails();
                    } else {
                        this.$notify({ title: 'Error', message: 'Failed to pay the bill', type: 'error' });
                    }
                });
            }
        },

        fetchNearbyPlayers() {
            this.loadingPlayers = true;
            fetch(`https://${GetParentResourceName()}/krs-billing:callback:getNearbyPlayers`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}), 
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok (${response.status})`);
                    }
                    return response.json();
                })
                .then(players => {
                    console.log('Nearby Players:', players);                     
                    if (Array.isArray(players) && players.length > 0) {
                        players.forEach((player, index) => {
                            console.log(`Player ${index + 1}: ID = ${player.id}, Name = ${player.name}, CID = ${player.cid}`);
                        });
                    } else {
                        console.log('[peleg-billing] No nearby players found.');
                    }

                    this.nearbyPlayers = players;
                    this.loadingPlayers = false;
                })
                .catch(error => {
                    console.error('Error fetching nearby players:', error);
                    this.loadingPlayers = false;
                });
        },
    
        closeUI() {
            this.setView('myBills');
            this.showbillmenu = false;
            fetch(`https://${GetParentResourceName()}/krs-billing:callback:close`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                SetNuiFocus(false, false); 
            });
        },

        opentest(data) {
            this.Cid = data.cid || null; 
            this.myBills = Array.isArray(data.myBills) ? data.myBills : [];
            this.showbillmenu = true;
            this.societyBills = Array.isArray(data.societyBills) ? data.societyBills : []; 
            this.billingHistory = Array.isArray(data.billingHistory) ? data.billingHistory : [];
            
            this.showPlayerBills = !!data.jobAccess; 
        },
        selectPlayerForInspection(player) {
            this.selectedPlayer = player;
            // this.fetchPlayerBills(player.cid);
            this.showPlayerBills = true;
        },
        closePlayerBills() {
            this.showPlayerBills = false;
            this.selectedPlayer = null;
            this.selectedPlayerBills = [];
        },
    },
    mounted() {
        window.addEventListener('message', (event) => {
            if (event.data.type === 'openMe') {
                const data = event.data.data;
                this.opentest(data);
            }
        });
    },
    
});
