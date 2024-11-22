import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function EducationScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <Animated.View entering={FadeInUp.delay(100).duration(500)}>
        <Text style={styles.title}>Aprenda sobre Energia Sustentável</Text>
      </Animated.View>

      {/* Seção: O que é Energia Sustentável */}
      <Animated.View entering={FadeInUp.delay(200).duration(500)}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>O que é Energia Sustentável?</Text>
            <Text style={styles.cardText}>
              Energia sustentável é aquela obtida de fontes renováveis, como o sol, o vento e a água. 
              Diferente das fontes não renováveis, como o carvão e o petróleo, ela não se esgota e causa 
              menos impacto ao meio ambiente.
            </Text>
          </Card.Content>
        </Card>
      </Animated.View>

      {/* Seção: Benefícios da Energia Sustentável */}
      <Animated.View entering={FadeInUp.delay(300).duration(500)}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Benefícios da Energia Sustentável</Text>
            <Text style={styles.cardText}>
              - Reduz a emissão de gases de efeito estufa, combatendo as mudanças climáticas.
              {'\n'}- Preserva recursos naturais para as futuras gerações.
              {'\n'}- Reduz custos a longo prazo com tecnologias mais eficientes.
              {'\n'}- Melhora a qualidade do ar e da água.
            </Text>
          </Card.Content>
        </Card>
      </Animated.View>

      {/* Seção: Fontes de Energia Sustentável */}
      <Animated.View entering={FadeInUp.delay(400).duration(500)}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Fontes de Energia Sustentável</Text>
            <Text style={styles.cardText}>
              Exemplos incluem:
              {'\n'}- **Energia Solar**: Aproveita a luz do sol.
              {'\n'}- **Energia Eólica**: Captura o vento com turbinas.
              {'\n'}- **Hidrelétrica**: Usa a força das águas.
              {'\n'}- **Biomassa**: Utiliza resíduos orgânicos como fonte de energia.
            </Text>
          </Card.Content>
        </Card>
      </Animated.View>

      {/* Seção: Como Você Pode Ajudar */}
      <Animated.View entering={FadeInUp.delay(500).duration(500)}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Como Você Pode Ajudar?</Text>
            <Text style={styles.cardText}>
              - Apague as luzes quando sair de um cômodo.
              {'\n'}- Desconecte aparelhos que não estão em uso.
              {'\n'}- Use lâmpadas de LED, que consomem menos energia.
              {'\n'}- Plante árvores para contribuir com a redução de CO2.
            </Text>
          </Card.Content>
        </Card>
      </Animated.View>

      {/* Botão para voltar */}
      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Voltar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E3F2FD', // Azul claro para um fundo mais vibrante
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0', // Azul escuro
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    elevation: 4, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#43A047', // Verde vibrante
    borderRadius: 10,
    alignSelf: 'center',
    width: '50%',
  },
  buttonLabel: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
