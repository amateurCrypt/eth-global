import { useContractRead } from 'wagmi';
import { address, abi } from '../artifacts/DataAsserter.json';

export default function getData() {
    const { data: riskData } = useContractRead({
      abi: abi,
      address: address,
      functionName: 'getData' 
    })
    return riskData
  }