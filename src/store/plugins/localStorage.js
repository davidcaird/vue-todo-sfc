export const localStoragePlugin = (store) => {
    console.log('Plugin was initialised');
    
    store.subscribe((mutation) => {
        console.log(mutation);
    });
}