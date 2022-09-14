import { defineStore } from 'pinia'
export const useMain = defineStore('main', {
    state: () => {
        return {
            singleForm: {
                singleP: 1,
                beginT: 0,
                diskNum: 8,
                diskBbit: 150,
                diskSpeed: 1200,
                primTrack: 1,
                direction: "1",
                function: "FCFS",
                dynamicTags: [],
            },
            road: [],
            updateFlag: false,
        }
    },
    getters: {
        
    },
    actions: {

    }
})