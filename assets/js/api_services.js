const ApiService = {
    // API 1: ViaCEP (Preenchimento Automático)
    consultarFrete: async function() {
        const cepInput = document.getElementById('cepInput');
        const cep = cepInput.value.replace(/\D/g, '');

        // Campos do formulário
        const rua = document.getElementById('rua');
        const bairro = document.getElementById('bairro');
        const cidade = document.getElementById('cidade');
        const estado = document.getElementById('estado');
        const numero = document.getElementById('numero');
        const msgFrete = document.getElementById('msgFrete');

        if (cep.length !== 8) {
            alert('CEP inválido! Digite 8 números.');
            return;
        }

        // Feedback visual
        cepInput.disabled = true;
        document.body.style.cursor = 'wait';

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado!');
                cepInput.value = '';
            } else {
                // Preenche os inputs ocultos ou visíveis
                rua.value = data.logradouro;
                bairro.value = data.bairro;
                cidade.value = data.localidade;
                estado.value = data.uf;
                
                // Foca no número para o usuário digitar
                numero.focus();

                // Mostra mensagem de Frete Grátis
                msgFrete.innerHTML = `
                    <div class="alert alert-success p-2 mt-2 small mb-0">
                        <i class="bi bi-geo-alt-fill"></i> Entrega para <strong>${data.localidade}/${data.uf}</strong><br>
                        <span class="fw-bold">FRETE GRÁTIS - BLACK FRIDAY</span>
                    </div>
                `;
            }
        } catch (error) {
            alert('Erro ao consultar CEP. Verifique sua conexão.');
        } finally {
            cepInput.disabled = false;
            document.body.style.cursor = 'default';
        }
    },

    // API 2: QuickChart (Mantida igual)
    gerarQrCodePix: function(pedidoId, valor, imgId, modalTitleId) {
        document.getElementById(modalTitleId).innerText = `Pagamento Pedido #${pedidoId}`;
        const conteudoPix = `Pagamento_ByteShop_Pedido_${pedidoId}_Valor_${valor}`;
        const urlApi = `https://quickchart.io/qr?text=${conteudoPix}&size=300&margin=2&dark=000000&light=ffffff`;
        document.getElementById(imgId).src = urlApi;
    }
};