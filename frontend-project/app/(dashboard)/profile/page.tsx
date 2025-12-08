"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, AlertCircle, Trash2, User as UserIcon } from "lucide-react";

const API_BASE_URL = "http://localhost:4000";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function Profile() {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [user, setUser] = useState<User | null>(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) {
          router.push("/sign-in");
          return;
        }

        const parsed = JSON.parse(storedUser);

        const response = await fetch(`${API_BASE_URL}/users/${parsed._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Falha ao buscar dados do usuário.");

        const userData = await response.json();

        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          password: "",
        });
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!user || !token) throw new Error("Usuário não autenticado.");

      const body: any = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.password) {
        body.password = formData.password;
      }

      const response = await fetch(`${API_BASE_URL}/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Erro ao atualizar usuário.");
      }

      const updated = await response.json();
      localStorage.setItem("user", JSON.stringify(updated));

      setUser(updated);
      setFormData((prev) => ({ ...prev, password: "" }));
      setSuccess("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!user || !token) throw new Error("Usuário não autenticado.");

      const response = await fetch(`${API_BASE_URL}/users/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao deletar conta.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.push("/sign-in");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Perfil</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie suas informações de conta
        </p>
      </div>

      {/* Card Principal */}
      <Card className="p-8 bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <UserIcon size={48} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground">{formData.name}</h2>
              <p className="text-muted-foreground">{formData.email}</p>
            </div>
          </div>

          <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
            <Edit2 className="mr-2" size={18} />
            {isEditing ? "Cancelar" : "Editar Perfil"}
          </Button>
        </div>
      </Card>

      {/* Formulário */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold mb-4">Informações da Conta</h3>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <Label>Nome Completo</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div>
              <Label>E-mail</Label>
              <Input name="email" value={formData.email} onChange={handleChange} type="email" required />
            </div>

            <div>
              <Label>Nova senha (opcional)</Label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit">Salvar Alterações</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="font-medium">{formData.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">E-mail</p>
              <p className="font-medium">{formData.email}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Excluir Conta */}
      <Card className="p-8 border-red-400 bg-red-50">
        <h3 className="text-lg font-bold text-red-600 mb-4">Excluir Conta</h3>
        <p className="text-red-600 mb-4">
          Esta ação é permanente e apagará todos os seus dados.
        </p>

        <Button variant="destructive" onClick={() => setOpenDeleteModal(true)}>
          <Trash2 size={18} className="mr-2" />
          Deletar Conta
        </Button>
      </Card>

      {/* MODAL DE CONFIRMAÇÃO */}
      {openDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl border">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Confirmar Exclusão
            </h2>

            <p className="text-muted-foreground mb-6">
              Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancelar
              </Button>

              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
              >
                Sim, excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
