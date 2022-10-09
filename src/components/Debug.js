import styled from 'styled-components'

const OPDiv = styled.div`
  position: absolute;
  height: 420px;
  max-width: 520px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
`
const Fundo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f20553;
  opacity: .3;
  outline: solid #f55086;
  outline-offset: -8px;
`
const Grupo = styled.div`
  padding: 24px;
  display: flex;
  flex-flow: wrap;
`
const Instrucao = styled.span`
  text-align: center;
  margin: 0 16px 0 0;
`

function Debug( {registradores, indice, timers, instrucao} ) {
  let arrayRegistradores = Object.values(registradores);
  
  return (
    <OPDiv>
      <Fundo />
      <Grupo>
        <Instrucao>{
          'pos:0x' + instrucao[0].toString(16).padStart(3, '0').toUpperCase()
        }</Instrucao>
        <Instrucao>{
          'inst:' + instrucao[1].toString(16).padStart(4, '0').toUpperCase()
        }</Instrucao>
      </Grupo>
      <Grupo>
        { 
          arrayRegistradores.map((reg, i) => {
            return(
              <Instrucao key={i}>{
                'V' + i.toString(16) + ':' + reg.toString(16).padStart(2, '0').toUpperCase()
              }</Instrucao>
            );
          })
        }
      </Grupo>
      <Grupo>
        <Instrucao>{'I:' + indice.toString(16).padStart(3, '0').toUpperCase()}</Instrucao>
        <Instrucao>{'DT:' + timers[0].toString(16).padStart(2, '0').toUpperCase()}</Instrucao>
        <Instrucao>{'ST:' + timers[1].toString(16).padStart(2, '0').toUpperCase()}</Instrucao>
      </Grupo>
    </OPDiv>
  )
}

export default Debug;
