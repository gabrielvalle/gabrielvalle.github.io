# PERNOITE.COM

-----------------------------------------------------------------------

Para instalar o projeto, siga as instruções:

-----------------------------------------------------------------------
# INSTALAR USANDO NODE.JS
-----------------------------------------------------------------------

**Atenção:** Certifique-se que tem o [Node.js v0.10.32][nodejs] ou superior instalado.

À partir do diretório raíz do PERNOITE, execute o comando abaixo:

    $ npm install

Agora, inicie o servidor com o comando abaixo:

    $ node server

Acesse-o através do link <http://localhost:9292/>.

# Compilar assets do projeto

**Atenção:** Certifique-se que tem o [Node.js][nodejs] instalado.

Após instalar o Node.js, você vai precisar do [Grunt][grunt].

    $ npm install grunt-cli -g

Instale as dependências do projeto:

    $ npm install

# Executando automaticamente

Sempre que os arquivos forem alterados, podemos executar a exportação dos assets automaticamente.

    $ grunt watch

[nodejs]: http://nodejs.org
[grunt]: http://gruntjs.com
[guard]: http://rubygems.org/gems/guard
