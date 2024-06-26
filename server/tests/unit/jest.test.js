

// Exemplo de uma função que faz uma chamada de API
async function fetchData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
}

// Teste utilizando mock function para simular a chamada de API
test('fetchData returns expected data', async () => {
    const mockData = { /* dados simulados */ };
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
    });

    const data = await fetchData();

    expect(data).toEqual(mockData);
});


//---------------------------------------------------


// Exemplo de uma função assíncrona
async function fetchDataWithDelay() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('data');
        }, 1000);
    });
}

// Teste utilizando mock function para controlar o temporizador
jest.useFakeTimers();
test('fetchDataWithDelay resolves after 1 second', async () => {
    const mockData = 'data';
    const fetchDataPromise = fetchDataWithDelay();
    jest.advanceTimersByTime(1000);
    const data = await fetchDataPromise;
    expect(data).toEqual(mockData);
});



//-----------------------------------------------------------



// Exemplo de um módulo que depende de um módulo externo
import externalModule from 'external-module';

export function processData() {
    const data = externalModule.getData();
    // Processa os dados
    return processedData;
}

// Teste utilizando mock function para simular o comportamento do módulo externo
jest.mock('external-module', () => ({
    getData: jest.fn().mockReturnValue('mocked data'),
}));

test('processData returns expected result', () => {
    const result = processData();
    expect(result).toEqual('processed data');
});

