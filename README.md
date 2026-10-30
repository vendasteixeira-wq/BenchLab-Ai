# BenchLab-Ai

Simulador de bancada eletrônica educativo. Primeiro slice: somente multímetro em tensão DC numa placa simples. Sem dependências, instalação, backend ou outros instrumentos.

## Arquivos mínimos

- `index.html`: placa, seleção das duas pontas, fonte liga/desliga, visor e reinício.
- `meter.js`: modelo ideal e leitura V(vermelha) − V(preta).
- `meter.test.cjs`: testes executáveis com Node.js 18 ou superior.
- `README.md`: execução, limites e aceite.

## Modelo

Fonte ideal de 12 V entre VIN e GND. R1 = 1 kΩ entre VIN e MID; R2 = 1 kΩ entre MID e GND. MID = 12 × R2 / (R1 + R2) = 6 V. Multímetro ideal, sem carregamento. Fonte desligada: nós em 0 V; sem capacitor neste circuito. Ponta desconectada: `---`, não uma falsa leitura de zero. Nenhuma conexão com hardware real.

## Executar

Abra `index.html` diretamente no navegador, inclusive offline. Alternativamente, na pasta do projeto:

```sh
python3 -m http.server 8000
```

Acesse http://localhost:8000. Para testes automatizados, na pasta do projeto:

```sh
node --test meter.test.cjs
```

## Sequência de teste manual e critério de pronto

Execute em ordem no navegador; cada mudança deve atualizar o visor sem recarregar:

| Passo | Ação | Resultado esperado |
| --- | --- | --- |
| 1 | Abrir a página | Duas pontas desconectadas; visor `---` |
| 2 | Preta GND; vermelha VIN | `12.000 V DC` |
| 3 | Vermelha MID | `6.000 V DC` |
| 4 | Vermelha GND; preta VIN | `-12.000 V DC` |
| 5 | Ambas VIN | `0.000 V DC` |
| 6 | Vermelha VIN; preta GND; desligar fonte | `0.000 V DC` |
| 7 | Religar fonte | `12.000 V DC` |
| 8 | Desconectar uma ponta | `---` e orientação para conectar |
| 9 | Reiniciar medição | Duas pontas desconectadas, fonte ligada, `---` |

Pronto quando os testes automatizados passam e os nove passos acima funcionam em navegador desktop e tela móvel, sem erros de JavaScript. Verificar também seleção por teclado (Tab e setas) e acionamento do reinício por Enter. O aceite visual/manual deve ser registrado separadamente dos testes do modelo.

## Limites deste slice

Somente esta placa e V DC. Sem AC, resistência, continuidade, osciloscópio, falhas, IA ou outros equipamentos. As leituras representam o circuito ideal descrito; não são medições de uma placa física.
