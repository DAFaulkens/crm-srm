
export const url = 'http://localhost:8000/api';

export const tokenVerify = 'G0T2dSKUDqlaVrDlTkh9Dekndg1DqOU219Esz8NN';

export const headers = {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]')
                        .getAttribute('content')
};

export const uploadHeader = {
    'Content-Type': 'multipart/form-data',
    'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]')
                        .getAttribute('content'),
    'custom-header': 'my-custome-header'
}