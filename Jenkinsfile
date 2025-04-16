pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // 与 Jenkins 中配置的 Node.js 名称一致
    }

    environment {
        // 可以在这里定义环境变量
        DEPLOY_PATH = '/usr/local/app/no_oops'
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:cs7eric/no_oops.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // 本地部署
                sh "rm -rf ${DEPLOY_PATH}/*"
                sh "cp -r dist/* ${DEPLOY_PATH}/"

                // 或者使用 SSH 部署到远程服务器
                // sshPublisher(
                //     publishers: [
                //         sshPublisherDesc(
                //             configName: 'your-ssh-server',
                //             transfers: [
                //                 sshTransfer(
                //                     sourceFiles: 'dist/**',
                //                     removePrefix: 'dist',
                //                     remoteDirectory: '/var/www/vite-project',
                //                     execCommand: 'chmod -R 755 /var/www/vite-project'
                //                 )
                //             ]
                //         )
                //     ]
                // )
            }
        }
    }

    post {
        success {
            // 构建成功后的操作
            echo 'Build and deploy completed successfully!'
        }
        failure {
            // 构建失败后的操作
            echo 'Build or deploy failed!'
        }
    }
}