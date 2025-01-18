import axios from 'axios';

export interface Location {
  city: string;
  region: string;
  country: string;
  loc: string; // "latitude,longitude"
}

export async function getLocation(ip: string): Promise<Location> {
  const accessKey = process.env.NEXT_PUBLIC_IPINFO_KEY;
  const url = 'https://apiip.net/api/check?ip='+ ip +'&accessKey='+ accessKey; 
  const response = await axios.get<Location>(url);
  console.log(response);
  return response.data;
}
