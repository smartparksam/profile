import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const SPREADSHEET_ID = '17lv6ZVW1k79iEV5xJks_tCEUGXdSIik6ZnJ5SbejCwM';

export default async function handler(req, res) {
  // CORS 처리
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const credentials = {
      "type": "service_account",
      "project_id": "profile-499810",
      "private_key_id": "5cd0fbf296bef33ce27d7e4344c6d9f21435de2c",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7EnD/9D79TBUQ\nAq6DJAXsb/Ks+C+lCrZIVy0Bn+n/8uh0vF/WtROeBmH0X4yd2XC1I7l5MRxVngHw\n+9MbGCknKrA0aMjiB+DN+/Zgz9zOufVbRiD41FA/JgJsO96mTXNn5fgFgu1k3nOr\nO5l58JrkxKI03nkWLUsCsymqiaARzp72VTzFCy9FyS2q2Nv+psEi7nqaprh6BXMD\n02rBRUjYVks0iKqXpNAyJ3XAMfrI7pfVWnYNkOa5anA2WxsaKeNx2C5Sw0EpeEaL\nhurRKwBphZVD+vlotu3y3FjMUagLnH/xhImyJL9HV+uZim5LQK4ZHFWY6gHilepe\nJmHUjJU3AgMBAAECggEAG7qFNwiK86b83OrWLN3AkQYbnZ7gtQvMRBcZNotFDJQC\nomxaSlbRyb50HjGxg/jl12ZXCMs07M3nHMNpobOoRJlzv85OWblFjagMzNcoCW5l\nRg+0NciGp9g9oLG+dBO5M6EnQm3gkUSAjFThEBg6urEYwqcSogJkWB9FYZ//stPB\nOYX2yd4cTYe/V8Hsor8nEpOXUc9rxVhpT6/O2OezOHhJHb8Xm6O/5DXZDx/VqYdt\nKKW4V/5Bww39/SWPBX94EZPmRTozmahXV48VLJnAG7o8YZYgNTt3IXYVfpWSwoIv\nlWOh0AhEOcjohjJkICmLYJ1JYbfmEn2Z5m4Gr9A/pQKBgQDyTwr1I0iTMrjq6uIz\nSpIVTzTu5LRNPi6DmxqMO3Rwn8rSwveSXqf/+6wgZK3ShBdi92ayeURRfHaE43GQ\n3AFPm/tbtL4jia3yu3vNObdwkY/LlBhC5fK0gdbexTvavmFcySQEJhFVBoQrH5Oo\n2Axj5lNrdiTc0Jsrdi61CEMBXQKBgQDFpGiFT83gJmfOJBOwn1rnLEa20YhQaYtl\n8YcPh5/Hwj/NuNDtEmI/CKNrHgKxmE/xhPA+/YrrVbR7PEKobdGSB2qV1+I6gbWq\nnBpmE2kN+syAqZZEfQV06xjkM1bb7hM/zl7daLUqImc2UjC472lXoUVdFHCQrGwv\nrOGKIU8jowKBgEvbbP3DdwQGHBgHQpt2G/ep3VNwq/WGov82foAqWNCtZczHlsPu\n+D9OZduaSUSfb8be1vrGthmgkmYV4kbMaWin13AlTGVJw/g6s45TJFeMamz8RwAi\nhvH1t/Pz4UIg2dA3dBwMYt6wdI4fi5WPVYms4K7CxNWQRRO9IvAvzvJNAoGAabXn\nBa7KkeJY0UQwl96T82OWKwBlZYUePxdxQtgqmOCH2dPJQ5P6onZPWeLCVBUAZVDS\nYw6feAHuN5/ik02xsuZultjSMrLf5PH7mK83GHgVW5fZPKaV/ZQlSyE+iwGKoC0U\nRl5Tz8Z45/AMCU5cTLeAbymYj3j5oIJaW9Q3DPsCgYEAwgMCcUnoEXfjZrILOS27\n6dg/7Xz5Gr39zNdeNvYMAULm8RIjgFBzJTlQ5tht4bbpvJdkpM8LaE3x5NPcP0Pa\naisBIgiOZgg3q/wimELqbbGrPpJEsEPlJJfcF284JClCnJU6UWzpbdFb82LHQzml\nLkkk9VKuiKUhNjU9Zq8vW1s=\n-----END PRIVATE KEY-----\n",
      "client_email": "profile@profile-499810.iam.gserviceaccount.com"
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // 시트2에서 데이터 가져오기 (A열: 제목, B열: 설명, C열: URL, D열: 문의버튼여부)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: '\uC2DC\uD2B82!A:D',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(200).json([]);
    }

    // 첫 번째 줄(헤더)을 제외하고 데이터 변환
    const links = rows.slice(1).map(row => ({
      title: row[0] || '',
      description: row[1] || '',
      url: row[2] || '#',
      isContact: (row[3] || '').trim().toUpperCase() === 'TRUE'
    })).filter(link => link.title !== '');

    res.status(200).json(links);
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    res.status(500).json({ success: false, message: error.toString() });
  }
}
