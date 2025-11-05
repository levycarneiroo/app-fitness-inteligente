"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-500 dark:to-pink-500 p-3 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Políticas de Privacidade e Termos de Uso
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Resumo de Segurança */}
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800 dark:text-green-300">
                <Shield className="w-5 h-5 mr-2" />
                Resumo de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="text-green-700 dark:text-green-300">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Lock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Seus dados são criptografados com padrão militar (AES-256)</span>
                </li>
                <li className="flex items-start">
                  <Eye className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Nunca compartilhamos suas informações pessoais com terceiros</span>
                </li>
                <li className="flex items-start">
                  <Database className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Você tem controle total sobre seus dados e pode excluí-los a qualquer momento</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Coleta de Dados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Database className="w-5 h-5 mr-2" />
                1. Coleta de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Dados que coletamos:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Informações de perfil:</strong> Nome, email, idade, altura, peso</li>
                  <li><strong>Dados de fitness:</strong> Objetivos, nível de experiência, histórico de treinos</li>
                  <li><strong>Dados de uso:</strong> Interações com o app, preferências, progresso</li>
                  <li><strong>Dados de dispositivos:</strong> Informações de smartwatch e sensores (opcional)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Como coletamos:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Diretamente através dos formulários que você preenche</li>
                  <li>Automaticamente durante o uso do aplicativo</li>
                  <li>Através de integrações com dispositivos wearables (com sua permissão)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Uso dos Dados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <UserCheck className="w-5 h-5 mr-2" />
                2. Uso dos Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Utilizamos seus dados para:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Personalizar treinos e dietas com base no seu perfil</li>
                  <li>Acompanhar seu progresso e fornecer insights</li>
                  <li>Enviar notificações relevantes sobre treinos e alimentação</li>
                  <li>Melhorar nossos algoritmos de IA para recomendações mais precisas</li>
                  <li>Fornecer suporte técnico quando necessário</li>
                  <li>Garantir a segurança e funcionamento do aplicativo</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Importante:</strong> Seus dados de saúde são processados localmente sempre que possível e nunca são vendidos para terceiros.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compartilhamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Eye className="w-5 h-5 mr-2" />
                3. Compartilhamento de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">NÃO compartilhamos seus dados com:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Empresas de marketing ou publicidade</li>
                  <li>Corretores de dados</li>
                  <li>Redes sociais (exceto quando você escolhe compartilhar)</li>
                  <li>Seguradoras ou empregadores</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Compartilhamos apenas quando:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Você explicitamente autoriza (ex: compartilhar conquistas na comunidade)</li>
                  <li>Exigido por lei ou ordem judicial</li>
                  <li>Necessário para proteger a segurança dos usuários</li>
                  <li>Com prestadores de serviços essenciais (sempre com contratos de confidencialidade)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Lock className="w-5 h-5 mr-2" />
                4. Segurança dos Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Medidas de segurança implementadas:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Criptografia:</strong> Todos os dados são criptografados em trânsito e em repouso</li>
                  <li><strong>Autenticação:</strong> Sistema de login seguro com verificação em duas etapas</li>
                  <li><strong>Acesso limitado:</strong> Apenas funcionários autorizados têm acesso aos dados</li>
                  <li><strong>Monitoramento:</strong> Sistemas de detecção de ameaças 24/7</li>
                  <li><strong>Backups seguros:</strong> Backups criptografados em múltiplas localizações</li>
                  <li><strong>Auditorias regulares:</strong> Testes de segurança e penetração periódicos</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Seus Direitos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <UserCheck className="w-5 h-5 mr-2" />
                5. Seus Direitos (LGPD)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Você tem o direito de:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Acesso:</strong> Solicitar uma cópia de todos os seus dados</li>
                  <li><strong>Correção:</strong> Corrigir dados incorretos ou incompletos</li>
                  <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados</li>
                  <li><strong>Portabilidade:</strong> Transferir seus dados para outro serviço</li>
                  <li><strong>Oposição:</strong> Opor-se ao processamento de seus dados</li>
                  <li><strong>Limitação:</strong> Limitar o processamento em certas circunstâncias</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <UserCheck className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-green-800 dark:text-green-300">
                    <strong>Como exercer seus direitos:</strong> Entre em contato conosco através do email privacy@flex.app ou nas configurações do aplicativo.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Database className="w-5 h-5 mr-2" />
                6. Cookies e Tecnologias Similares
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Tipos de cookies que utilizamos:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Essenciais:</strong> Necessários para o funcionamento básico do app</li>
                  <li><strong>Funcionais:</strong> Lembram suas preferências e configurações</li>
                  <li><strong>Analíticos:</strong> Nos ajudam a entender como você usa o app</li>
                  <li><strong>Personalização:</strong> Permitem personalizar sua experiência</li>
                </ul>
              </div>
              
              <p className="text-sm">
                Você pode gerenciar suas preferências de cookies nas configurações do seu navegador ou dispositivo.
              </p>
            </CardContent>
          </Card>

          {/* Menores de Idade */}
          <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-300">
                <AlertTriangle className="w-5 h-5 mr-2" />
                7. Menores de Idade
              </CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-700 dark:text-yellow-300">
              <p>
                O Flex é destinado a usuários com 18 anos ou mais. Não coletamos intencionalmente dados de menores de 18 anos. 
                Se você tem entre 13 e 17 anos, precisa da autorização dos seus pais ou responsáveis para usar o aplicativo.
              </p>
              <p className="mt-2">
                Se descobrirmos que coletamos dados de um menor sem autorização adequada, excluiremos essas informações imediatamente.
              </p>
            </CardContent>
          </Card>

          {/* Alterações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <AlertTriangle className="w-5 h-5 mr-2" />
                8. Alterações nesta Política
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
              <p>
                Podemos atualizar esta política periodicamente para refletir mudanças em nossas práticas ou por outros motivos operacionais, legais ou regulamentares.
              </p>
              <p>
                Quando fizermos alterações significativas, notificaremos você através do aplicativo ou por email com pelo menos 30 dias de antecedência.
              </p>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800 dark:text-blue-300">
                <UserCheck className="w-5 h-5 mr-2" />
                9. Entre em Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700 dark:text-blue-300 space-y-4">
              <p>
                Se você tiver dúvidas sobre esta política ou sobre como tratamos seus dados, entre em contato conosco:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@flex.app</p>
                <p><strong>Telefone:</strong> (11) 9999-9999</p>
                <p><strong>Endereço:</strong> Rua da Privacidade, 123 - São Paulo, SP</p>
                <p><strong>Encarregado de Dados (DPO):</strong> dpo@flex.app</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-8">
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-2"
          >
            Voltar ao Cadastro
          </Button>
        </div>
      </div>
    </div>
  );
}