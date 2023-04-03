import React from 'react'

const Ruf = () => {
    return (
        <div>
            {/* Table for Save Image */}

            CREATE TABLE usersdata (
            id INT NOT NULL AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            userimg VARCHAR(255) NOT NULL,
            date DATETIME NOT NULL,
            PRIMARY KEY (id)
            );

            {/* run mysql server  */}
            sudo /opt/lampp/manager-linux-x64.run
            {/* stop mysql server  */}
            sudo /etc/init.d/apache2 stop


        </div>
    )
}

export default Ruf