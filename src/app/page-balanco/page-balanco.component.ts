import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Produto } from '../produto.model';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'page-balanco',
  templateUrl: './page-balanco.component.html',
  styleUrls: ['./page-balanco.component.css'],
  providers: [DatePipe]
})
export class PageBalancoComponent implements OnInit {

  simpleReqProdutos : Observable<Produto[]>
  produtos
  columnsTableProdutos : String[] = ["descricao", "data", "quantidade", "quantidade_add", "action"]
  date_format="yyyyMMdd"

  constructor(
    private produtoService : ProdutoService,
    private router : Router,
    private datePipe : DatePipe){ }
  
  ngOnInit(){
    this.simpleReqProdutos = this.produtoService.getProdutos()

    this.simpleReqProdutos.subscribe((produtos) => {
      this.produtos = produtos
      for(let p of this.produtos){
        p.data_update = this.getDataAtual()
      }
    })
  }

  realizarBalanco(produto){
    produto.quantidade_add = produto.quantidade_add || 0

    this.produtoService.realizarBalanco(produto).subscribe((res)=>{
      console.log(res)
    })
  }

  getDataAtual(){
    return this.datePipe.transform(new Date(),this.date_format)
  }

}