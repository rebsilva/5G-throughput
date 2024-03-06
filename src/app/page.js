"use client"; 
import { useState} from 'react'
import './index.css';

export default function Home() {
  const [parameters, setParameters] = useState('');
  const [result, setResult] = useState('');

  let modulation_order = 0;
  let bandwidth = 0;
  let dl_ul = '';
  let layers = 0;

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!parameters) {
      // do nothing
    } 
    else {
      let inputParameters = parameters;
      const myArray = inputParameters.split(',');

      // definir parâmetros
      modulation_order = parseInt(myArray[0]);
      bandwidth = parseInt(myArray[1]);
      dl_ul = myArray[2];
      layers = parseInt(myArray[3]);

      // cálculo de um único recurso

      const subcarries = 12;
      const data_symbols = 14 - 3;
      const data_resource_elements = subcarries * data_symbols;

      // mapeamento da tabela de eficiencia espectral

      const spectral_efficiency_table = new Map();

      spectral_efficiency_table.set(0,0.2344);
      spectral_efficiency_table.set(1,0.377);
      spectral_efficiency_table.set(2,0.6016);
      spectral_efficiency_table.set(3,0.877);
      spectral_efficiency_table.set(4,1.1758);
      spectral_efficiency_table.set(5,1.4766);
      spectral_efficiency_table.set(6,1.6953);
      spectral_efficiency_table.set(7,1.9141);
      spectral_efficiency_table.set(8,2.1602);
      spectral_efficiency_table.set(9,2,4063);
      spectral_efficiency_table.set(10,2.5703);
      spectral_efficiency_table.set(11,2.7305);
      spectral_efficiency_table.set(12,3.0293);
      spectral_efficiency_table.set(13,3.3223);
      spectral_efficiency_table.set(14,3.6094);
      spectral_efficiency_table.set(15,3.9023);
      spectral_efficiency_table.set(16,4.2129);
      spectral_efficiency_table.set(17,4.5234);
      spectral_efficiency_table.set(18,4.8164);
      spectral_efficiency_table.set(19,5.1152);
      spectral_efficiency_table.set(20,5.332);
      spectral_efficiency_table.set(21,5.5547);
      spectral_efficiency_table.set(22,5.8906);
      spectral_efficiency_table.set(23,6.2266);
      spectral_efficiency_table.set(24,6.5703);
      spectral_efficiency_table.set(25,6.9141);
      spectral_efficiency_table.set(26,7.1602);
      spectral_efficiency_table.set(27,7.4063);

      // definição do número máximo de bits

      const max_bits_symbol = spectral_efficiency_table.get(modulation_order)

      const slot_data = data_resource_elements * max_bits_symbol

      // throughput

      const number_resource_blocks = ((bandwidth*1000) / 360) - 4

      const slots_per_sec = 1000/0.5

      let downlink_slots = 0
      if(dl_ul == '3:1') {
        downlink_slots = slots_per_sec*(3/4);
      } else if (dl_ul == '4:1') {
        downlink_slots = slots_per_sec*(4/5)

      } else {
      alert('there is an error');
      }


      const throughput = slot_data * number_resource_blocks * downlink_slots * layers

      // resultado

      setResult(`the 5G throughput is ${throughput/1000000} mbps`)
    }
  }

    return (
      <>
        <section className='section-center'>
          <form className='form' onSubmit={handleSubmit}>
            <h3>throughput 5G</h3>
            <span className='description'>type the modulation order, bandwidth, download/upload and layers separated by comma.</span>
            <div className='form-group'>
              <input 
                type='text' 
                className='form-field input-parameters'
                value={parameters}
                placeholder='type the parameters'
                onChange={(e)=> setParameters(e.target.value)}
              />
              <button type='submit' className='submit-btn'>
                {'submit'}
              </button>
            </div>
            <span>{result}</span>
          </form>
        </section>
        </>
      )
}
