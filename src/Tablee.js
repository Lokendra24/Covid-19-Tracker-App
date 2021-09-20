import React from 'react'
import './Table.css'
import {prettyprintstat} from './Util'

export default function Tablee({countrie}) {
    return (
        <div className="table">
          {
             countrie.map((contry)=>(
                <tr>
                  <td >{contry.country}</td>
                  <td ><strong>{prettyprintstat(contry.cases)}</strong></td>
                </tr>            
                 ))    
             }
        </div>
    )
}
